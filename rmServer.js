/** @param {NS} ns **/
export async function main(ns) {
    var check = false;
    var hostname = ns.args[0];
    check = ns.deleteServer(hostname);
    if (check) ns.tprint ("Success! Server " + hostname + " has been removed!");
    else ns.tprint ("Error! Server " + hostname + " could not be removed!");
}
