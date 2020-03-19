//@ts-check
/**
 * @param  {Array<{parts: number;count: number;person: String;}>} data
 */
module.exports = (data,location) => {
    let writable = "Name | Count | Parts\n --- | --- | ---\n"
    data.forEach(element => {
        writable += `\`${element.person}\` | ${element.count} | ${element.parts}\n`
    });
    require('fs').writeFileSync(location, writable)
}