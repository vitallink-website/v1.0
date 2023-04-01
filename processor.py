import numpy as np
from js import createObject
from pyodide.ffi import create_proxy
import pandas as pd
from copy import copy
from scipy.interpolate import pchip_interpolate
from scipy.signal import butter, filtfilt, find_peaks, lfilter
from scipy.fft import fft, fftshift

def filter(data, cutoff, fs, order, filter_type):
    nyq = fs / 2
    normal_cutoff = cutoff / nyq
    # Get the filter coefficients 
    b, a = butter(order, normal_cutoff, btype = filter_type, analog = False)
    y = filtfilt(b, a, data)
    return y

def HeartBeat_ECG(ECG_filtered, fs):
    t = np.linspace(0, len(ECG_filtered)/fs, len(ECG_filtered), endpoint = True)
    z = ECG_filtered.copy()
    pos = z * (z>0)
    thr_R = (max(pos) + np.mean(pos)) / 3
    peaks, values = find_peaks(pos, height = thr_R)
    values = values['peak_heights']

    while True:
      NN = peaks[1:] - peaks[:-1]
      thr_OL = sum(np.sort(NN)[-3:]) / 6
      ou = np.where(NN < thr_OL)
      ou = ou[0][:]
      if ou.any():
        temp = np.min([values[ou].T,values[ou+1].T] , axis=0)
        for i in range(len(temp)):
          peaks = peaks[values != temp[i]]
          values = values[values != temp[i]]
      else: break

    while True:
      NN = peaks[1:] - peaks[:-1]
      thr_OL = np.mean(NN) * 1.5
      ou = np.where(NN > thr_OL)
      ou = ou[0][:]
      if ou.any():
        temp = np.min([values[ou].T,values[ou+1].T] , axis=0)
        for i in range(len(temp)):
          peaks = peaks[values != temp[i]]
          values = values[values != temp[i]]
      else: break

    peak_times = t[peaks]
    period = np.mean(peak_times[1:] - peak_times[:-1])
    HR = 60 / period
    return HR

def PQRST(ECG_filtered, fs):
    t = np.linspace(0, len(ECG_filtered)/fs, len(ECG_filtered), endpoint = True)
    z = ECG_filtered.copy()

    # R peaks detection ----------------------------------------------------------
    pos = z * (z>0)
    thr_R = (max(pos) + np.mean(pos)) / 3
    peaks, values = find_peaks(pos, height = thr_R)
    values = values['peak_heights']
    while True:
      NN = peaks[1:] - peaks[:-1]
      thr_OL = sum(np.sort(NN)[-3:]) / 6
      ou = np.where(NN < thr_OL)
      ou = ou[0][:]
      if ou.any():
        temp = np.min([values[ou].T,values[ou+1].T] , axis=0)
        for i in range(len(temp)):
          peaks = peaks[values != temp[i]]
          values = values[values != temp[i]]
      else: break
    while True:
      NN = peaks[1:] - peaks[:-1]
      thr_OL = np.mean(NN) * 1.5
      ou = np.where(NN > thr_OL)
      ou = ou[0][:]
      if ou.any():
        temp = np.min([values[ou].T,values[ou+1].T] , axis=0)
        for i in range(len(temp)):
          peaks = peaks[values != temp[i]]
          values = values[values != temp[i]]
      else: break
    R = np.array(peaks)
    # ----------------------------------------------------------------------------

    # Q and S peaks detection ----------------------------------------------------
    Q = []; S = []
    neg = -(z * (z<0))
    ind1 = np.argmax(neg[2:R[0]])
    Q.append(2 + ind1)
    for i in range(len(R)-1):
      t1 = R[i]; t2 = R[i+1]; t_diff = t2-t1; t_mean = int(np.floor(t_diff/5))
      ind1 = np.argmax(neg[t2-t_mean:t2])
      Q.append(t2 - t_mean + ind1)
      ind2 = np.argmax(neg[t1:t1+t_mean])
      S.append(t1 + ind2)
    ind2 = np.argmax(neg[R[-1]:-2])
    S.append(R[-1] + ind2)
    Q = np.array(Q); S = np.array(S)
    # ----------------------------------------------------------------------------

    # P and T peaks detection ----------------------------------------------------
    for i in R:
      u = abs(i - Q)
      j1 = np.argmin(u)
      for j in np.arange(Q[j1],0,-1):
        if abs(z[j]) <= 0.1:
          break
        z[j] = 0
      v = abs(i - S)
      j2 = np.argmin(v)
      for j in np.arange(S[j2],len(z),1):
        if abs(z[j]) <= 0.1:
          break
        z[j] = 0
      for j in np.arange(Q[j1],S[j2],1):
        z[j] = 0 
    P = []; T = []
    ind1 = np.argmax(pos[2:R[0]])
    P.append(2 + ind1)
    for i in range(len(R)-1):
      d = int(np.floor((R[i+1] - R[i]) / 10))
      t1 = R[i] + d; t2 = R[i+1] - d
      t_mean = int(np.floor((2*t2+t1)/3))
      ind1 = np.argmax(pos[t_mean:t2])
      P.append(t_mean + ind1)
      t_mean = int(np.floor((2*t1+t2)/3))
      ind2 = np.argmax(pos[t1:t_mean])
      T.append(t1 + ind2)
    ind2 = np.argmax(neg[R[-1]:-2])
    T.append(R[-1] + ind2)
    P = np.array(P); T = np.array(T)
    # ----------------------------------------------------------------------------

    return P.tolist(), Q.tolist(), R.tolist(), S.tolist(), T.tolist()

def Quality_ECG(ECG_filtered, fs, t):
    num = int(np.floor(len(t)/(fs/3)))
    rms = []
    for i in range(num):
      sig = ECG_filtered[i*int(np.floor(fs/3)):(i+1)*int(np.floor(fs/3))]
      rms.append(np.sqrt(np.sum(sig**2)/(fs/3)))
    rms.sort()
    Q = np.mean(rms[:int(num/3)]) / np.mean(rms[2*int(num/3):]) 
    Quality_index = 100 - 1e4**Q / 2
    if Quality_index <= 30: Quality_index = 30
    return Quality_index

def clearing_ECG(ECG, fs):
    ECG_filtered1 = filter(ECG, 5, fs, 10, 'high')
    ECG_filtered = filter(ECG_filtered1, 20, fs, 10, 'low')
    window_size = 5
    clear_ECG = ECG_filtered.copy()
    for i in range(len(ECG)):
        if (i < len(ECG)-window_size) & (i > window_size):
            clear_ECG[i] = np.mean(ECG_filtered[i-window_size:i+window_size])
    return clear_ECG

def ECG_signal_processing(ECG, fs):
    t = np.linspace(0, len(ECG)/fs, len(ECG), endpoint = True)
    ECG_filtered = clearing_ECG(ECG, fs)
    HeartRate = HeartBeat_ECG(ECG_filtered, fs)
    P, Q, R, S, T = PQRST(ECG_filtered, fs)
    RR_interval = np.mean(t[R[1:]]-t[R[:-1]])
    PR_interval = np.mean(t[R] - t[P])
    PR_RR = PR_interval / RR_interval
    t_ST = (t[S] + t[T]) / 2
    t_PQ = (t[P] + t[Q]) / 2
    QRS_duration = np.mean(t_ST - t_PQ)
    Quality_index = Quality_ECG(ECG_filtered, fs, t)
    return round(HeartRate), round(PR_RR,2), round(QRS_duration*1000,2), round(Quality_index,2), P, Q, R, S, T, ECG_filtered

########################################### end of cardiogram

########################################### start of oximetry

def filter(data, cutoff, fs, order, filter_type):
    nyq = fs / 2
    normal_cutoff = cutoff / nyq
    # Get the filter coefficients 
    b, a = butter(order, normal_cutoff, btype = filter_type, analog = False)
    y = filtfilt(b, a, data)
    return y

def HeartBeat_PPG(PPG, fs):
    H = 20
    t = np.linspace(0, len(PPG)/fs, len(PPG), endpoint = True)
    PPG_filtered = filter(PPG, H, fs, 10, 'low')
    x = PPG_filtered
    y = x - min(x)
    i, _ = find_peaks(-y, distance = fs/((t[-1]-t[0])/2.5))
    j = y[i]
    n = np.arange(len(x))
    baseline = np.interp(n,i,j)
    z = y - baseline
    thr_ind = np.floor(fs / 3); 
    thr_amp = (4 * np.mean(z) + max(z)) / 5;
    peaks_ind, _ = find_peaks(z, distance = thr_ind, height = thr_amp);
    period = np.mean(peaks_ind[1:] - peaks_ind[:-1]) / fs;
    HR = 60 / period;
    return HR

def remove_baseline(x):
    y = x - min(x)
    i, _ = find_peaks(-y, distance = 10)
    j = y[i]
    n = np.arange(len(x))
    baseline = np.interp(n,i,j)
    z = y - baseline
    return z, baseline

def AC_DC_calc(x):
    z, baseline = remove_baseline(x)
    AC = np.sqrt(np.sum(z**2))
    DC = np.mean(baseline) + min(x)
    return AC, DC

def SpO2_estimation(IR, Red, fs):
    AC_Red, DC_Red = AC_DC_calc(Red)
    AC_IR, DC_IR = AC_DC_calc(IR)
    R = (AC_Red/DC_Red) / (AC_IR/DC_IR)
    SpO2 = 110 - 28*R
    if SpO2 > 100:
        SpO2 = 99.
    return SpO2

def Quality_PPG(PPG, fs, t):
    PPG_rb, _ = remove_baseline(PPG)
    num = int(np.floor(len(t)/(fs/3)))
    rms = []
    for i in range(num):
        sig = PPG_rb[i*int(np.floor(fs/3)):(i+1)*int(np.floor(fs/3))]
        rms.append(np.sqrt(np.sum(sig**2)/(fs/3)))
    rms.sort()
    Q = np.mean(rms[:int(num/3)]) / np.mean(rms[2*int(num/3):]) 
    Quality_index = 100 - 1e4**Q / 2
    if Quality_index <= 30: Quality_index = 30
    return Quality_index

def clearing_PPG(PPG, fs, window_size):
    clear_PPG = PPG.copy()
    for i in range(len(PPG)):
        if (i < len(PPG)-window_size) & (i > window_size):
          clear_PPG[i] = np.mean(PPG[i-window_size:i+window_size])
        elif(i >= len(PPG)-window_size):
          clear_PPG[i] = np.mean(PPG[i-window_size:])
        else:
          clear_PPG[i] = np.mean(PPG[:i+window_size])
    return clear_PPG

def PPG_signal_processing(IR, Red, fs):
    dt = 1 / fs
    t = np.linspace(0, len(IR)/fs, len(IR), endpoint = True)
    HeartRate = HeartBeat_PPG(IR, fs)
    SpO2 = SpO2_estimation(IR, Red, fs)
    # SpO2 = 0
    Quality_index = Quality_PPG(IR, fs, t)
    # Quality_index = 0
    return round(HeartRate), round(SpO2), round(Quality_index,2)

# def PPG_signal_processing(IR, Red, fs):
#     t = np.linspace(0, len(IR)/fs, len(IR), endpoint = True)
#     clear_IR = clearing_PPG(IR, fs, 5)
#     clear_Red = clearing_PPG(Red, fs, 5)
#     HeartRate = HeartBeat_PPG(clear_IR, fs)
#     SpO2 = SpO2_estimation(clear_IR, clear_Red, fs)
#     Quality_index = Quality_PPG(clear_IR, fs, t)
#     return clear_IR, clear_Red, round(HeartRate), round(SpO2,2), round(Quality_index,2)
    
########################################### end of oximetry

def PPG_signal_processing_Adapter(IR, Red, fs):
    IR_array = np.asarray(IR.to_py())
    Red_array = np.asarray(Red.to_py())
    try :
      return PPG_signal_processing(IR_array, Red_array, fs)
    except: 
      return -1

createObject(create_proxy(PPG_signal_processing_Adapter), "PPG_signal_processing") 

  ###########################################

def BP_estimation(PPG, Force, fs):
  t = np.linspace(0, len(PPG)/fs, len(PPG), endpoint = True)
  g_len = 5
  N = int(np.floor(t[-1]) - g_len + 1)
  # Removing Baseline ----------------------------------------------------------
  H = 10;
  x = filter(PPG, H, fs, 10, 'low')
  x = PPG
  y = x - np.min(x)
  i, _ = find_peaks(-y, distance = 10)
  j = y[i]
  n = np.arange(len(x))
  baseline = np.interp(n,i,j)
  z = y - baseline

  # Applied Pressure line ------------------------------------------------------
  ind0 = np.max(np.where(Force <= 0.01))
  Force[:ind0] = 0
  AP = np.linspace(0, np.max(Force), len(Force)-ind0, endpoint = True)

  # PPG Signal Sampling --------------------------------------------------------
  n_samples = np.arange(g_len/2, np.floor(t[-1])-g_len/2+1, 1)
  samples = []
  for i in range(N):
    sig = z[int(np.floor(fs*i)):int(np.floor((i+g_len)*fs))]
    rms = np.sqrt(np.sum(sig**2))
    samples.append(rms*2)

  # Interpolation --------------------------------------------------------------
  PPG_ip = pchip_interpolate(n_samples, samples, t)
  PPG_ip = PPG_ip[ind0:]
  t = t[ind0:]

  # A1, A2, and B1 -------------------------------------------------------------
  A2 = PPG_ip[0]
  k = np.argmax(PPG_ip)
  B1 = AP[k]
  A1 = PPG_ip[k]

  Diastolic = 0; Mean = 0; Systolic = 0
  # B2, B3 ---------------------------------------------------------------------
  AP40 = np.max(np.where(AP < 40))
  if ~((PPG_ip[-1] > 0.5*A1) or (PPG_ip[AP40] > 0.95*A1) or (A1 < A2) or (B1 < 40)):
    B2, B3 = B2_B3_estimation(AP, PPG_ip, k, A1, A2, B1)
    if (B2<100) and (B3<100):
      # BV estimation --------------------------------------------------------------
      BV = np.zeros(len(AP))
      BV[:k] = A2 + (A1-A2)*np.exp(-1/2*((AP[:k]-B1)/B2)**2)
      BV[k:] = A1 * np.exp(-1/2*((AP[k:]-B1)/B3)**2)
      # BP estimation --------------------------------------------------------------
      Diastolic = 0.65*B1 - 1.54*A2/A1*B2 + 26.2
      Mean = 0.68*B1 - 1.53*A2/A1*B2 + 38.8
      Systolic = 2.5*Mean - 1.5*Diastolic
    else: print('Try Again!')
  else: print('Try Again!')
  return Diastolic, Systolic
  
def B2_B3_estimation(x, y, k, A1, A2, B1):
  f = []; g = []
  for i in np.arange(1,len(x)):
    error = (A2 + (A1-A2)*np.exp(-1/2 * ((x[:k]-B1)/x[i])**2)) - y[:k]
    f.append(sum(error**2))
    error = A1*np.exp(-1/2 * ((x[k:]-B1)/x[i])**2) - y[k:]
    g.append(sum(error**2))
  B2_ind = np.argmin(f) + 1
  B2 = x[B2_ind]
  B3_ind = np.argmin(g) + 1
  B3 = x[B3_ind]
  return B2, B3

def BloodPressure_Adapter(PPG_data, force_Data, fs):
    ppg_array = np.asarray(PPG_data.to_py())
    force_array = np.asarray(force_Data.to_py())
    try :
      return BP_estimation(ppg_array, force_array, fs)
    except: 
      return -1

createObject(create_proxy(BloodPressure_Adapter), "BloodPressure")

def ECG_signal_processing_Adapter(ECG_data, fs):
    array = np.asarray(ECG_data.to_py())
    try :
      return ECG_signal_processing(array, fs)
    except: 
      return -1

createObject(create_proxy(ECG_signal_processing_Adapter), "ECG_signal_processing")

################################################ pcg

def butter_bandpass(lowcut, highcut, fs, order=5):
    nyq = 0.5*fs
    low = lowcut/nyq
    high = highcut/nyq
    b,a = butter(order, [low, high], btype='band')
    return b, a

def butter_bandpass_filter(data, lowcut, highcut, fs, order=5):
  b, a = butter_bandpass(lowcut, highcut, fs, order = order)
  y = lfilter(b, a, data)
  return y

def butterworth_low_pass_filter(original_signal, order, cutoff, fs):
  b, a = butter(order, 2*cutoff/fs, btype = 'low')
  low_pass_filtered_signal = filtfilt(b, a, original_signal)
  return low_pass_filtered_signal


def butterworth_high_pass_filter(original_signal, order, cutoff, fs):
  b, a = butter(order, 2*cutoff/fs, btype = 'high')
  high_pass_filtered_signal = filtfilt(b, a, original_signal)
  return high_pass_filtered_signal

def spike_removal(original_signal, fs):
  windowsize = round(fs/2)

  # Find any samples outside of an integer number of windows:
  trailingsamples = len(original_signal) % windowsize

  # Reshape the signal into a number of windows:
  sampleframes = np.reshape(original_signal[0:len(original_signal)-trailingsamples], (windowsize,-1), order = 'F')
  
  # Find the MAAs:
  MAAs = (abs(sampleframes)).max(0)
  # MAAs = np.amax(abs(sampleframes), axis = 0)

  val = np.max(MAAs)
  window_num = np.argmax(MAAs)

  # While there are still samples greater than 3* the median value of the MAAs, then remove those spikes:
  while(len((np.where(np.array(MAAs) > np.median(MAAs)*3))[0]) != 0):

    # Find the window with the max MAA:
    val = np.max(MAAs)
    window_num = np.argmax(MAAs)

    if((type(window_num) != np.int64) and (len(window_num) > 1)):
      window_num = window_num[0]

    # Find the postion of the spike within that window:
    val = max(abs(sampleframes[:,window_num]))
    spike_position = np.argmax(abs(sampleframes[:,window_num]))

    if((type(spike_position) != np.int64) and (len(spike_position) > 1)):
      spike_position = spike_position[0]

    # Finding zero crossings (where there may not be actual 0 values, just a change from positive to negative):
    dummy = abs(np.diff(np.sign(sampleframes[:,window_num]))) > 1
    zero_crossings = np.append(np.multiply(dummy, 1), 0)

    # Find the start of the spike, finding the last zero crossing before spike position. If that is empty, take the start of the window:
    non_zeros = list((np.where(zero_crossings[0:spike_position+1] != 0))[0])

    if non_zeros != []:

      spike_start = max([0 , non_zeros[len(non_zeros)-1]])

      # Find the end of the spike, finding the first zero crossing after spike position. If that is empty, take the end of the window:
      zero_crossings[0:spike_position+1] = np.zeros(spike_position+1)
      non_zeros = list((np.where(zero_crossings != 0))[0])
      spike_end = min([non_zeros[0] , windowsize])
      # if non_zeros != []:
      #   spike_end = min([non_zeros[0] , windowsize])
      # else: 
      #   spike_end = windowsize

      # Set to Zero
      sampleframes[spike_start:spike_end+1,window_num] = 0.0001*np.zeros(spike_end+1-spike_start)

      # Recaclulate MAAs
      MAAs = (abs(sampleframes)).max(0)

  despiked_signal = np.array(np.reshape(sampleframes, (-1, 1), order = 'F'))

  # Add the trailing samples back to the signal:
  despiked_signal = np.append(despiked_signal, original_signal[len(despiked_signal):])
  return despiked_signal


def heart_signal_preprocessing(heart_signal, fs):
  # 25-400Hz 4th order Butterworth band pass
  heart_signal = butterworth_low_pass_filter(heart_signal, 2, 400, fs)
  heart_signal = butterworth_high_pass_filter(heart_signal, 2, 25, fs)
  # Spike removal from the filtered signal:
  preprocessed_data = spike_removal(heart_signal, fs)
  return preprocessed_data

from scipy.signal import hilbert

def Homomorphic_Envelope_with_Hilbert(input_signal, fs, lpf_frequency):
  # 8Hz, 1st order, Butterworth LPF
  B_low, A_low = butter(1, 2*lpf_frequency/fs, btype = 'low')

  homomorphic_envelope = np.exp(filtfilt(B_low, A_low, np.log(abs(hilbert(input_signal)))))

  # Remove spurious spikes in first sample:
  homomorphic_envelope[0] = homomorphic_envelope[1]
  return homomorphic_envelope


def HeartRate(data, fs):
  preprocessed_data = heart_signal_preprocessing(data, fs)
  # Find the homomorphic envelope
  homomorphic_envelope = Homomorphic_Envelope_with_Hilbert(preprocessed_data, fs, 8)
  # Find the autocorrelation:
  y = homomorphic_envelope-np.mean(homomorphic_envelope)
  lags, c = xcorr(y, y, detrend = False, maxlags = len(y)-1)
  signal_autocorrelation = c[len(homomorphic_envelope):]

  min_index = int(0.5*fs)
  max_index = 2*fs

  index = np.argmax(signal_autocorrelation[min_index-1:max_index])
  true_index = index+min_index-1

  heartRate = 60/(true_index/fs)
  return round(heartRate), preprocessed_data

## -----------------------------------------------------------------------------
def xcorr(x, y, normed = True, detrend = False, maxlags = 10):
    # Cross correlation of two signals of equal length
    # Returns the coefficients when normed=True
    # Returns inner products when normed=False
    # Usage: lags, c = xcorr(x,y,maxlags=len(x)-1)
    # Optional detrending e.g. mlab.detrend_mean

    Nx = len(x)
    if Nx != len(y):
        raise ValueError('x and y must be equal length')
    
    if detrend:
        import matplotlib.mlab as mlab
        x = mlab.detrend_mean(np.asarray(x)) # can set your preferences here
        y = mlab.detrend_mean(np.asarray(y))
    
    c = np.correlate(x, y, mode='full')

    if normed:
        n = np.sqrt(np.dot(x, x) * np.dot(y, y)) # this is the transformation function
        c = np.true_divide(c,n)

    if maxlags is None:
        maxlags = Nx - 1

    if maxlags >= Nx or maxlags < 1:
        raise ValueError('maglags must be None or strictly '
                         'positive < %d' % Nx)

    lags = np.arange(-maxlags, maxlags + 1)
    c = c[Nx - 1 - maxlags:Nx + maxlags]
    return lags, c


def lung_signal_preprocessing(lung_signal, fs):
  b, a = butter(2, [2*50/fs, 2*2500/fs], btype = 'bandpass')
  denoised_signal = filtfilt(b, a, lung_signal)
  preprocessed_data = spike_removal(denoised_signal, fs)
  return preprocessed_data

def Respiration_Rate(signal, fs):
  preprocessed_data = lung_signal_preprocessing(signal, fs)
  one_breath = 3*fs  # average duration of one breath is 3s 
  peaks, _ = find_peaks(signal, distance = one_breath)
  time = len(signal)/fs
  RR = len(peaks)*60/time
  return round(RR), preprocessed_data

# ## **Quality Index**

def Lung_SNR(signal, fs):
  FFT = abs(fftshift(fft(signal)))
  f = np.arange(0,fs/2,fs/len(FFT))
  FFT = (FFT[int(len(FFT)/2):])
  ind = [index for index,value in enumerate(f) if value > 50 and value < 2500]
  s1_list = [FFT[i] for i in ind]
  s2_list = np.delete(FFT, ind)
  S1 = sum(s1_list)
  S2 = sum(s2_list)
  snr = S1/S2
  return snr

# ------------------------------------------------------------------------------
def Heart_SNR(signal, fs):
  FFT = abs(fftshift(fft(signal)))
  f = np.arange(0,fs/2,fs/len(FFT))
  FFT = (FFT[int(len(FFT)/2):])
  ind = [index for index,value in enumerate(f) if value > 20 and value < 1200]
  s1_list = [FFT[i] for i in ind]
  s2_list = np.delete(FFT, ind)
  S1 = sum(s1_list)
  S2 = sum(s2_list)
  snr = S1/S2
  return snr

# ------------------------------------------------------------------------------
def Lung_Quality_Index(snr):
  max_snr = 25
  if snr > max_snr:
    quality_ind = 100
  elif snr < max_snr:
    quality_ind = snr*100/max_snr
  return quality_ind

# ------------------------------------------------------------------------------
def Heart_Quality_Index(snr):
  max_snr = 25
  if snr > max_snr:
    quality_ind = 100
  elif snr < max_snr:
    quality_ind = snr*100/max_snr
  return quality_ind

# # **Final Functions for Software Implementation**

def Heart_Lung_Separation(pcg_signal, fs):
  pcg_filtered = butter_bandpass_filter(pcg_signal, 20, 2000, fs, order=5)
  lung_signal = butter_bandpass_filter(pcg_filtered, 100, 1000, fs, order=5)
  heart_signal = pcg_filtered - lung_signal

  # Quality Index of heart signal:
  heart_signal_snr = Heart_SNR(heart_signal, fs)
  heart_quality_ind = Heart_Quality_Index(heart_signal_snr)

  # Quality Index of lung signal:
  lung_signal_snr = Lung_SNR(lung_signal, fs)
  lung_quality_ind = Lung_Quality_Index(lung_signal_snr)
  return [heart_signal, lung_signal, heart_quality_ind, lung_quality_ind]

# def Record_Audio(heart_signal, lung_signal, fs):
#   sf.write('heart_sound.wav', heart_sound, fs)
#   sf.write('lung_sound.wav', lung_sound, fs)


def PCG_Signal_Processing(pcg_signal, fs):
  heart_signal, lung_signal, heart_quality_ind, lung_quality_ind = Heart_Lung_Separation(pcg_signal, fs)
  heart_rate, preprocessed_heart_signal = HeartRate(heart_signal, fs)
  respiration_rate, preprocessed_lung_signal = Respiration_Rate(lung_signal, fs)
  return heart_quality_ind, lung_quality_ind, heart_rate, respiration_rate


def PCG_signal_processing_Adapter(PCG, fs):
    array = np.asarray(PCG.to_py())
    try :
      return PCG_Signal_Processing(array, fs)
    except: 
      return -1

createObject(create_proxy(PCG_signal_processing_Adapter), "PCG_signal_processing") 

