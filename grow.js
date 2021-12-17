/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog ("ALL");
	if (ns.args.length == 0) {
		ns.tprint ("Error: No target argument set, must be a valid hostname.");
		ns.exit ();
	}
	var hostname = ns.args[0];
	var bankAmount = ns.getServerMoneyAvailable (hostname)
	var out;

	ns.print ("~~~~~~~~~~~~~~~~~~~");
	ns.print ("Begin bank spoofing process of [" + hostname + "]");
	ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a") + 
		" | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
	while (true) {
		out = await ns.grow (hostname);
		bankAmount = ns.getServerMoneyAvailable (hostname);
		ns.print ("Target bank modified by " + ns.nFormat (out, "0,0.000") + "!");
		ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a"));
	}
}
