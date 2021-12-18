/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog ("ALL");
	if (ns.args.length == 0) {
		ns.tprint ("Error: Missing arguments, must be a valid hostname.");
		ns.exit ();
	}
	var hostname = ns.args[0];
	var secLevel = ns.getServerSecurityLevel (hostname);
	var out;

	ns.print ("~~~~~~~~~~~~~~~~~~~");
	ns.print ("Begin weakening process of [" + hostname + "]");
	ns.print ("Security: " + ns.nFormat (secLevel, "0,0.00") + 
		" | ETA: " + ns.tFormat(ns.getGrowTime(hostname)));
	while (true) {
		out = await ns.weaken (hostname);
		secLevel = ns.getServerSecurityLevel (hostname);
		ns.print ("Target security modified by " + ns.nFormat (out, "0,0.00") + "!"); 
		ns.print ("Security: " + ns.nFormat (secLevel, "0,0.00"));
	}
}
