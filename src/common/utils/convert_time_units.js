export function toMs(unit, time) {
    switch (unit) {
        case "seconds":
            return time * 1000
            break;
        case "minutes":
            return time * 60 * 1000
            break;
        case "hours":
            return time * 60 * 60 * 1000
            break;
        default:
            return time;
            break;
    }
}
export function toSec(unit, time) {
    switch (unit) {
        case "milliseconds":
            return time / 1000
            break;
        case "minutes":
            return time * 60
            break;
        case "hours":
            return time * 60 * 60
            break;
        default:
            return time;
            break;
    }
}