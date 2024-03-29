import * as moment from 'moment';

export class Constant {

    // server IP or domain name
    public static HOST: string = 'http://13.58.114.56:3210';

    // hydroponic types
    public static HYDROPONIC_TYPE: any = [{
        label: "Drip System",
        value: "drip system"
    }, {
        label: "EBB-Flow",
        value: "ebb-flow"
    }, {
        label: "NFT",
        value: "nft"
    }, {
        label: "Water Culture",
        value: "water culture"
    }, {
        label: "Aeroponics",
        value: "aeroponics"
    }, {
        label: "Wick System",
        value: "wick system"
    }];

    // actuator type
    public static ACTUATOR_TYPE: any[] =
    [{
        type: 'Water',
        numberOfActuator: [11, 12]
    }, {
        type: 'Fan',
        numberOfActuator: [31, 32]
    }, {
        type: 'Lighting',
        numberOfActuator: [21, 22]
    }, {
        type: 'Oxygen',
        numberOfActuator: [41, 42]
    }];

    // actuator priority
    public static ACTUATOR_PRIORITY: string[] = ['Primary', 'Secondary'];

    // default report time in second
    public static DEFAULT_REPORT_TIME: number = 3;

    // time format for parsing
    public static PARSE_TIME_FORMAT = "MM/DD/YYYY HH:mm A";

    // default interval and delay time for schedule
    public static DEFAULT_INTERVAL_TIME = 10;
    public static DEFAULT_DELAY_TIME = 0;

    // default start and stop timer
    public static DEFAULT_START_TIME = moment('00:00','HH:mm A').format('HH:mm');
    public static DEFAULT_STOP_TIME = moment('23:59','HH:mm A').format('HH:mm');

    // timeout for smart config in milisecond
    public static DEFAULT_TIMEOUT_SMARTCONFIG = 22000;
}