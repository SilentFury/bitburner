/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog ("ALL");
	var hostname = ns.args[0];
	var out;
	ns.print ("Begin automated weakening process of [" + hostname + "]");
	ns.print ("ETA: " + ns.tFormat(ns.getGrowTime(hostname)));
	while (true) {
		out = await ns.weaken (hostname);
		ns.print ("Host security has been modified by " + ns.nFormat(out, "0,0.00") + "!");
	}
}
