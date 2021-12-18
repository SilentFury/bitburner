/** @param {NS} ns **/
export async function main(ns) {
    var check = false;
    if (ns.args.length == 0) {
	    ns.tprint ("Warning: No hostname argument, must include valid hostname.");
	    ns.exit ();
	}
    var hostname = ns.args[0];
    check = ns.deleteServer(hostname);
    if (check) ns.tprint ("Server " + hostname + " has been removed.");
    else ns.tprint ("Error: Server " + hostname + " could not be removed.");
}
