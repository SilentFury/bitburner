/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog ("ALL");
	var hostname = ns.args[0];
	var out;
	ns.print ("Begin automated bank spoofing process of [" + hostname + "]");
	ns.print ("ETA: " + ns.tFormat(ns.getGrowTime(hostname)));
	while (true) {
		out = await ns.grow (hostname);
		ns.print ("Host bank has been spoofed for " + ns.nFormat(out, "0,0.000") + "%!");
	}
}
