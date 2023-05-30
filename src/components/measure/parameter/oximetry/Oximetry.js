import React, { useState } from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";

const Oximetry = () => {
  const dbFunc = useAddToDB("oximetryData");

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  const [filterActiveNum, setFilterActiveNum] = useState(0);

  const calculateBeatPerMinute = (inputs) => {
    console.log(inputs.data);

    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      PPG_signal_processing(inputs.data.ir, inputs.data.red, inputs.freq)
    ); // HeartRate, SpO2, Quality_index

    console.log(signal_output[0]);
    console.log(signal_output[1]);
    setHeartBeat(signal_output[0]);
    setSPO2(signal_output[1]);
    setQualityIndex(signal_output[2]);
  };

  function makeArrayFormString(arr) {
    return arr
      // .slice(1, -1)
      // .replace(/\n/g, " ")
      // .split(/\b\s+/)
      .split(" ")
      .map(function (item) {
        return Number(item);
      });
  }

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    let payload = {
      IR: "[" + inputs.data.ir.toString() + "]",
      Red: "[" + inputs.data.red.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//PPG_signal", payload);
    console.log(res.data);
    if (!Number(res.data.Try_Again)) {
      setHeartBeat(res.data.HeartRate);
      setSPO2(res.data.SpO2);
      setQualityIndex(res.data.Quality_index);
      return [
        makeArrayFormString(res.data.clear_IR),
        inputs.data.red,
        makeArrayFormString(res.data.clear_Red),
        makeArrayFormString(res.data.PPG_clear),
        makeArrayFormString(res.data.PPG_clear),
      ];
    } else
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
      });
  }

  async function sendData(){
    let payload = {
        IR:"[12051,12056,12058,12056,12062,12062,12062,12063,12066,12070,12070,12070,12071,12074,12074,12077,12076,12078,12078,12071,12065,12057,12046,12036,12020,12009,11995,11982,11968,11958,11947,11936,11927,11921,11915,11908,11902,11900,11894,11891,11885,11884,11882,11879,11872,11872,11871,11869,11867,11867,11868,11869,11870,11875,11881,11887,11889,11895,11898,11904,11905,11908,11913,11916,11917,11919,11922,11924,11923,11927,11930,11932,11933,11937,11941,11942,11944,11948,11952,11958,11956,11961,11966,11966,11966,11970,11973,11976,11973,11977,11981,11980,11980,11983,11985,11985,11985,11989,11991,11991,11993,11996,11999,12000,11999,12004,12006,12008,12006,12010,12013,12016,12014,12018,12023,12024,12024,12028,12033,12034,12033,12036,12041,12043,12042,12047,12049,12053,12053,12057,12062,12066,12065,12071,12079,12081,12083,12087,12093,12094,12097,12101,12105,12109,12109,12113,12117,12120,12119,12117,12112,12102,12085,12069,12059,12045,12032,12022,12013,12004,11993,11989,11983,11980,11975,11972,11971,11970,11966,11964,11963,11963,11961,11959,11958,11957,11954,11951,11950,11949,11950,11949,11952,11953,11954,11954,11956,11958,11960,11958,11960,11960,11959,11958,11960,11961,11959,11956,11958,11960,11959,11958,11961,11964,11965,11964,11968,11970,11972,11972,11975,11978,11983,11979,11983,11985,11988,11986,11992,11993,11997,11995,11999,12003,12005,12003,12008,12011,12014,12012,12015,12020,12021,12021,12024,12027,12028,12027,12032,12034,12037,12035,12041,12043,12046,12042,12049,12051,12054,12053,12057,12058,12061,12061,12062,12068,12069,12068,12073,12076,12077,12077,12081,12085,12087,12089,12090,12094,12098,12097,12101,12105,12109,12107,12112,12114,12114,12106,12101,12094,12084,12069,12059,12048,12037,12026,12017,12011,12003,11998,11992,11990,11987,11984,11980,11981,11980,11978,11974,11974,11973,11972,11971,11971,11970,11969,11968,11971,11974,11975,11975,11978,11981,11982,11982,11983,11982,11982,11979,11979,11980,11979,11975,11979,11979,11977,11975,11978,11981,11979,11978,11980,11983,11985,11985,11989,11992,11994,11994,11997,11998,12001,12000,12004,12005,12009,12008,12011,12014,12016,12013,12016,12021,12023,12021,12024,12028,12029,12029,12032,12038,12039,12037,12041,12044,12044,12043,12047,12050,12051,12050,12055,12057,12060,12056,12060,12064,12066,12062,12067,12070,12072,12070,12074,12077,12080,12077,12081,12084,12087,12085,12088,12091,12088,12081,12076,12071,12060,12045,12035,12025,12015,12002,11993,11987,11979,11970,11967,11964,11960,11956,11953,11952,11951,11947,11946,11947,11946,11941,11942,11942,11941,11941,11939,11941,11943,11945,11944,11948,11947,11949,11946,11949,11950,11950,11947,11949,11948,11946,11945,11945,11947,11946,11945,11947,11948,11950,11949,11952,11953,11953,11954,11958,11960,11962,11961,11966,11970,11970,11969,11974,11977,11978,11977,11982,11983,11986,11985,11988,11991,11996,11994,11999,12002,12003,12003,12005,12009,12009,12009,12013,12018,12018,12018,12021,12024,12027,12025,12030,12031,12035,12033,12037,12038,12043,12039,12045,12048,12048,12048,12053,12057,12060,12058,12062,12069,12069,12068,12072,12074,12074,12067,12063,12057,12045,12030,12019,12007,11996,11981,11972,11963,11953,11943,11937,11931,11925,11918,11916,11913,11908,11907,11904,11901,11899,11896,11893,11893,11889,11887,11884,11884,11884,11883,11884,11887,11889,11891,11888,11892,11895,11896,11895,11897,11897,11896,11895,11896,11897,11897,11895,11897,11898,11900,11897,11901,11903,11904,11902,11906,11909,11912,11908,11911,11916,11915,11917,11919,11921,11924,11924,11926,11929,11930,11931,11933,11936,11939,11938,11940,11943,11945,11945,11949,11952,11955,11953,11958,11960,11963,11962,11965,11968,11971,11969,11973,11978,11981,11979,11982,11986,11988,11988,11991,11996,11998,11997,12001,12004,12006,12005,12009,12015,12016,12015,12021,12022,12026,12025,12029,12033,12036,12034,12037,12036,12034,12024,12018,12010,11998,11983,11970,11959,11947,11933,11922,11914,11905,11896,11892,11886,11882,11876,11876,11874,11872,11867,11865,11864,11862,11859,11859,11856,11855,11854,11852,11854,11854,11854,11857,11862,11863,11866,11865,11868,11870,11872,11869,11872,11872,11870,11869,11871,11872,11871,11872,11872,11875,11874,11872,11876,11878,11878,11879,11884,11886,11888,11887,11892,11894,11897,11898,11904,11904,11908,11906,11911,11913,11915,11916,11918,11921,11923,11923,11928,11932,11933,11934,11936,11939,11940,11938,11944,11948,11950,11947,11949,11956,11958,11956,11960,11964,11966,11966,11968,11972,11975,11973,11974,11981,11984,11982,11988,11992,11995,11994,12001,12006,12008,12008,12013,12017,12020,12018,12023,12029,12030,12030,12035,12038,12041,12035,12037,12033,12023,12010,12000,11988,11974,11958,11947,11935,11924,11912,11904,11898,11891,11881,11878,11876,11873,11867,11866,11862,11861,11858,11853,11853,11853,11850,11846,11848,11847,11845,11846,11848,11851,11852,11852,11855,11857,11859,11858,11859,11862,11863,11860,11864,11863,11863,11861,11865,11865,11866,11863,11866,11870,11872,11872,11874,11877,11882,11881,11887,11892,11895,11896,11899,11903,11905,11906,11910,11913,11915,11916,11920,11923,11926,11925,11929,11932,11934,11935,11939,11942,11945,11942,11947,11952,11953,11953,11956,11960,11961,11960,11963,11966,11968,11967,11970,11974,11977,11972,11978,11981,11983,11982,11986,11990,11991,11989,11995,12000,12001,12002,12006,12010,12013,12011,12017,12021,12022,12025,12028,12033,12035,12036,12041,12044,12044,12041,12039,12034,12024,12009,11999,11986,11973,11958,11947,11934,11927,11914,11905,11900,11894,11888,11884,11882,11882,11878,11876,11877,11875,11874,11869,11871,11869,11867,11866,11868,11870,11871,11870,11874,11876,11877,11878,11882,11883,11881,11881,11883,11884,11882,11881,11883,11882,11881,11880,11880,11881,11881,11883,11885,11886,11889,11886,11891,11894,11895,11895,11900,11902,11906,11904,11908,11911,11914,11915,11919,11923,11924,11925,11930,11934,11936,11937,11942,11946,11950,11949,11955,11957,11961,11960,11965,11970,11973,11971,11974,11979,11978,11978,11982,11986,11988,11986,11990,11994,11997,11994,11999,12000,12005,12002,12006,12011,12012,12011,12017,12021,12023,12023,12025,12028,12031,12031,12033,12034,12031,12022,12016,12007,11994,11978,11965,11952,11940,11928,11915,11909,11899,11891,11884,11880,11876,11873,11869,11869,11868,11864,11862,11861,11861,11857,11856,11856,11857,11852,11853,11857,11858,11859,11859,11861,11865,11867,11865,11869,11872,11872,11870,11873,11875,11874,11871,11872,11873,11873,11871,11875,11877,11879,11877,11879,11884,11885,11886,11891,11894,11896,11895,11899,11903,11905,11904,11908,11912,11916,11914,11919,11923,11924,11925,11930,11934,11936,11935,11938,11944,11945,11945,11950,11956,11957,11956,11960,11965,11967,11967,11971,11974,11977,11974,11980,11984,11985,11985,11990,11994,11998,11996,12000,12004,12008,12005,12011,12015,12019,12019,12022,12025,12030,12029,12034,12037,12040,12041,12044,12047,12043,12037,12029,12015,12003,11985,11972,11957,11944,11928,11913,11905,11896,11885,11876,11869,11865,11861,11855,11852,11850,11847,11844,11841,11838,11838,11835,11833,11832,11829,11828,11829,11830,11832,11832,11837,11838,11840,11841,11844,11845,11847,11847,11846,11849,11849,11847,11847,11848,11851,11850,11851,11853,11856,11854,11857,11859,11861,11859,11862,11867,11869,11868,11873,11875,11880,11878,11883,11886,11886,11888,11890,11894,11897,11896,11899,11903,11905,11905,11909,11912,11915,11911,11919,11921,11924,11923,11925,11931,11933,11929,11934,11938,11939,11939,11943,11947,11951,11948,11953,11957,11960,11960,11964,11965,11969,11967,11973,11976,11979,11978,11980,11984,11987,11987,11990,11995,11996,11997,12001,12006,12009,12008,12014,12017,12021,12020,12019,12015,12010,11997,11986,11973,11959,11942,11929,11915,11903,11889,11876,11869,11860,11853,11846,11843,11838,11838,11831,11830,11829,11825,11821,11821,11821,11818,11817,11814,11814,11815,11814,11816,11819,11819,11819,11824]" ,
        Red:"[10994,10995,10997,10998,10998,10996,10998,11001,11000,10999,11002,11002,11004,11001,11003,11005,11005,11001,11003,11000,10997,10991,10987,10984,10977,10970,10966,10961,10958,10950,10947,10945,10941,10936,10935,10935,10933,10929,10930,10929,10927,10923,10924,10924,10923,10919,10921,10921,10921,10918,10920,10923,10925,10923,10927,10930,10933,10931,10934,10935,10937,10934,10938,10940,10940,10939,10941,10943,10942,10939,10941,10942,10944,10941,10944,10946,10948,10944,10947,10951,10952,10950,10952,10954,10957,10953,10954,10956,10957,10955,10957,10958,10960,10957,10959,10961,10961,10960,10962,10964,10966,10964,10964,10966,10968,10966,10967,10971,10971,10971,10971,10973,10974,10974,10975,10976,10979,10977,10979,10981,10982,10983,10982,10984,10984,10986,10985,10988,10989,10991,10989,10991,10994,10996,10994,10995,10998,10999,10998,11001,11003,11005,11002,11004,11007,11008,11006,11009,11009,11006,10999,10995,10988,10982,10974,10969,10965,10960,10955,10953,10951,10949,10945,10945,10946,10944,10940,10941,10942,10943,10938,10939,10941,10940,10937,10936,10938,10937,10933,10935,10936,10936,10934,10937,10939,10941,10937,10939,10942,10941,10937,10939,10941,10941,10936,10940,10941,10941,10938,10939,10941,10942,10939,10941,10944,10945,10943,10945,10945,10947,10946,10948,10950,10951,10951,10952,10953,10955,10953,10956,10959,10959,10959,10959,10960,10962,10960,10962,10965,10966,10965,10965,10968,10969,10968,10969,10971,10971,10971,10971,10974,10975,10975,10976,10977,10979,10978,10979,10981,10982,10982,10982,10985,10985,10987,10985,10987,10989,10989,10989,10991,10992,10995,10992,10995,10997,10998,10997,10999,11001,11003,11001,11003,11007,11005,11005,11005,11003,11000,10992,10989,10986,10979,10972,10970,10968,10963,10957,10957,10956,10954,10952,10952,10952,10952,10947,10949,10950,10948,10947,10945,10947,10947,10944,10946,10947,10948,10946,10947,10948,10951,10947,10950,10953,10952,10948,10950,10952,10951,10946,10949,10952,10951,10947,10949,10949,10950,10947,10950,10951,10951,10948,10952,10955,10955,10951,10955,10958,10959,10957,10958,10960,10962,10959,10962,10963,10964,10962,10965,10966,10968,10966,10967,10970,10969,10969,10971,10971,10974,10971,10973,10976,10977,10977,10977,10979,10979,10979,10980,10981,10983,10982,10981,10983,10984,10984,10984,10988,10989,10989,10987,10989,10990,10991,10990,10992,10993,10994,10992,10995,10996,10997,10994,10995,10993,10989,10982,10979,10974,10969,10963,10961,10959,10953,10948,10947,10947,10944,10941,10940,10940,10938,10936,10937,10938,10936,10933,10934,10935,10936,10932,10933,10935,10933,10932,10935,10936,10937,10934,10937,10937,10937,10934,10937,10937,10936,10933,10936,10937,10936,10934,10936,10936,10937,10933,10936,10939,10938,10936,10938,10941,10942,10936,10941,10943,10945,10943,10943,10946,10947,10945,10945,10949,10950,10947,10951,10953,10952,10951,10953,10957,10957,10955,10957,10959,10960,10957,10961,10961,10964,10962,10963,10966,10967,10965,10966,10969,10970,10969,10970,10971,10974,10972,10972,10975,10975,10976,10975,10978,10979,10980,10978,10983,10983,10984,10982,10985,10988,10987,10985,10986,10983,10981,10975,10970,10966,10961,10955,10951,10946,10942,10936,10935,10932,10929,10925,10923,10923,10922,10919,10918,10917,10917,10913,10915,10915,10914,10909,10909,10910,10909,10906,10907,10909,10910,10908,10910,10911,10912,10910,10911,10914,10914,10912,10914,10915,10914,10911,10912,10914,10915,10910,10913,10914,10916,10912,10914,10917,10918,10914,10917,10920,10921,10918,10920,10921,10923,10920,10923,10925,10926,10924,10926,10928,10928,10927,10929,10931,10933,10929,10931,10934,10935,10932,10935,10938,10939,10938,10939,10941,10943,10940,10941,10944,10944,10944,10946,10947,10948,10948,10949,10950,10952,10951,10953,10954,10957,10956,10956,10958,10959,10961,10959,10962,10964,10965,10965,10966,10968,10968,10967,10970,10970,10970,10967,10967,10963,10960,10953,10949,10945,10939,10931,10929,10925,10921,10914,10913,10913,10910,10905,10904,10904,10904,10900,10901,10901,10900,10897,10897,10897,10896,10893,10895,10895,10894,10893,10895,10897,10899,10897,10899,10902,10902,10900,10901,10903,10904,10900,10901,10903,10903,10900,10902,10904,10903,10901,10904,10904,10905,10902,10905,10907,10908,10906,10909,10910,10912,10910,10914,10914,10917,10912,10916,10918,10919,10918,10921,10921,10923,10919,10923,10926,10927,10924,10927,10930,10930,10928,10929,10932,10933,10931,10934,10935,10937,10934,10936,10938,10939,10938,10940,10942,10943,10942,10944,10946,10948,10946,10947,10950,10951,10952,10951,10954,10957,10958,10957,10960,10963,10962,10961,10965,10966,10967,10966,10968,10971,10971,10970,10971,10972,10970,10965,10961,10957,10952,10944,10941,10935,10931,10923,10920,10918,10914,10910,10908,10908,10906,10901,10903,10902,10901,10897,10898,10898,10897,10894,10894,10895,10894,10892,10893,10894,10897,10895,10896,10898,10899,10898,10900,10901,10901,10898,10901,10902,10901,10899,10901,10903,10903,10898,10902,10904,10905,10902,10904,10906,10908,10905,10908,10910,10911,10910,10913,10916,10918,10914,10918,10919,10920,10919,10921,10924,10924,10922,10926,10928,10929,10927,10929,10932,10933,10931,10932,10935,10936,10934,10936,10939,10939,10939,10938,10942,10942,10941,10943,10945,10946,10945,10946,10947,10947,10948,10948,10949,10952,10950,10951,10954,10955,10956,10954,10957,10959,10961,10958,10961,10962,10965,10963,10966,10968,10968,10968,10970,10972,10972,10970,10974,10973,10970,10965,10962,10956,10951,10943,10940,10936,10929,10923,10922,10918,10916,10911,10911,10909,10907,10905,10906,10905,10906,10902,10903,10904,10902,10899,10901,10902,10903,10899,10901,10903,10905,10903,10905,10908,10907,10906,10907,10909,10909,10906,10908,10909,10909,10904,10907,10909,10909,10905,10907,10909,10909,10905,10909,10912,10912,10910,10912,10914,10916,10915,10917,10919,10919,10918,10921,10923,10925,10922,10924,10926,10928,10927,10929,10932,10933,10933,10935,10936,10938,10938,10938,10940,10943,10943,10943,10945,10946,10947,10946,10949,10950,10951,10948,10953,10953,10954,10952,10953,10956,10957,10956,10958,10959,10960,10960,10962,10963,10963,10963,10965,10967,10968,10966,10967,10970,10971,10967,10967,10964,10960,10953,10949,10943,10936,10930,10926,10922,10918,10912,10910,10909,10906,10902,10902,10902,10902,10898,10898,10899,10898,10897,10896,10898,10896,10895,10895,10895,10897,10894,10897,10899,10900,10897,10899,10902,10902,10900,10901,10903,10904,10899,10902,10904,10903,10900,10902,10904,10905,10902,10905,10906,10906,10904,10907,10909,10911,10909,10911,10913,10914,10912,10915,10917,10918,10915,10919,10921,10921,10921,10922,10924,10927,10925,10927,10930,10930,10929,10930,10933,10935,10934,10936,10938,10939,10938,10938,10941,10942,10942,10942,10945,10947,10947,10946,10947,10950,10950,10951,10952,10953,10954,10954,10955,10957,10959,10957,10961,10963,10963,10962,10966,10967,10967,10966,10969,10972,10971,10968,10967,10965,10960,10954,10948,10942,10936,10927,10923,10919,10912,10906,10903,10902,10899,10893,10893,10894,10891,10888,10886,10887,10885,10884,10883,10884,10882,10880,10881,10881,10881,10878,10882,10883,10884,10882,10884,10887,10888,10884,10888,10889,10888,10886,10888,10890,10891,10886,10889,10890,10891,10887,10889,10892,10893,10889,10891,10894,10894,10891,10895,10898,10898,10896,10899,10902,10902,10901,10903,10905,10906,10904,10905,10908,10908,10907,10909,10910,10912,10913,10912,10916,10917,10916,10916,10920,10921,10919,10920,10922,10923,10924,10923,10924,10926,10926,10927,10930,10930,10931,10930,10932,10934,10935,10933,10936,10938,10938,10938,10939,10941,10942,10941,10943,10944,10946,10944,10947,10949,10950,10949,10952,10954,10955,10954,10956,10957,10955,10952,10950,10944,10939,10930,10925,10922,10915,10905,10902,10898,10894,10887,10887,10885,10884,10880,10880,10880,10878,10875,10876,10876,10874,10870,10871,10874,10873,10869,10870,10873,10871,10870,10873,10875,10875,10872]" ,
        fs:"130"
  
    };
    let res = await axios.post("http://127.0.0.1:5000//PPG_signal", payload);
    console.log(res.data);
    // var dataParameter = {};
    // dataParameter["heartBeatPPG"] = 90;
    // dataParameter["SPO2"] = 90;
    // dbFunc.updateHistory(dataParameter);
  }

  function addToDB() {
    var dataParameter = {};
    dataParameter["heartBeatPPG"] = heartBeat;
    dataParameter["SPO2"] = SPO2;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => {
    setSaved(0);
    setHeartBeat("");
    setSPO2("");
    setQualityIndex("");
  };

  function handleChange(number, changeFilterShow) {
    setFilterActiveNum(number);
    changeFilterShow(number);
  }

  return (
    <MeasureBase
      {...{
        values: ["red", "ir", "force"],
        diagrams: [
          {
            name: "ir",
            calculatedDots: [],
          },
        ],
        command: 0x01,
        action: calculateBeatPerMinuteAPI,
        flushData: flushDatas,
        texts: [
          "Heart beat: " + heartBeat,
          "SPO2: " + SPO2,
          "Quality index: " + qualityIndex,
        ],
        title: (openModal, changeFilterShow, filterShow) => (
          <>
            <h2 className="measure-title">Oximetry</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={4}>
                <h5 className="measure-title">
                  Please put your finger on PPG sensors and then press
                </h5>
              </Col>
              <Col md={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
              <Col md={3}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose signal"
                >
                  <Dropdown.Item
                    onClick={() => handleChange(0, changeFilterShow)}
                    active={filterActiveNum === 0 || filterActiveNum === 1}
                  >
                    ir
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(2, changeFilterShow)}
                    active={filterActiveNum === 2 || filterActiveNum === 3}
                  >
                    red
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(4, changeFilterShow)}
                    active={filterActiveNum === 4 || filterActiveNum === 5}
                  >
                    filtered ppg
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col md={3}>
                <Button
                  onClick={() =>
                    handleChange(
                      filterActiveNum % 2
                        ? filterActiveNum - 1
                        : filterActiveNum + 1,
                      changeFilterShow
                    )
                  }
                >
                  {filterActiveNum % 2 ? "main" : "filtered"} signal
                </Button>
              </Col>
            </Row>
          </>
        ),
        children: () => (
          <>
            <Row className="mt-5">
              <Col>
                <h5 style={{ color: "black" }}>
                  Heart Rate: {heartBeat} (bpm)
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>SpO2: {SPO2} (%)</h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  Quality Index: {qualityIndex} (%)
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
              <Button onClick={() => sendData()}>send data to backend</Button>
              </Col>
            </Row>
            <Row className="measure-button-row">
              <Col>
                <Link to="/Measure/Measurement">
                  <Button> Back</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    shareData("OximetryData", [
                      "Heart beat: " + heartBeat,
                      "SPO2: " + SPO2,
                      "Quality index: " + qualityIndex,
                    ]);
                  }}
                >
                  Output
                </Button>
              </Col>
              <Col>
                <Button onClick={() => addToDB()}>
                  Save {saved ? <FcCheckmark /> : ""}
                </Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
};

export default Oximetry;
