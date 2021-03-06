/**
* @param {NS} ns
**/
export async function main (ns) {
	ns.disableLog ("ALL");
	var hostname = ns.args[0];

	// Hostname validation
	if (hostname == "home") {
		ns.toast ("> Error: [home] is not a valid hostname.", "error");
		ns.exit();
	}
	if (!ns.serverExists (hostname)) {
		ns.toast ("> Error: [" + hostname + "] server does not exist.", "error");
		ns.exit ();
	}
	// Variable declaration and initialization
	ns.print ("# Begin automated farming process!")
	var bankThresh = ns.getServerMaxMoney(hostname)*0.7;
	var secThresh = ns.getServerMinSecurityLevel(hostname) + 5;
	var out, secLevel, bankAmount;

	while (true) {
		// Security weakening sub process
		secLevel = ns.getServerSecurityLevel (hostname);
		if (secLevel > secThresh) {
			ns.print ("~~~~~~~~~~~~~~~~~~~");
			ns.print ("Begin weakening process of [" + hostname + "]");
			ns.print ("Security: " + ns.nFormat (secLevel, "0,0.00") + 
				" | ETA: " + ns.tFormat(ns.getGrowTime(hostname)));
			while (secLevel > secThresh) {
				out = await ns.weaken (hostname);
				secLevel = ns.getServerSecurityLevel (hostname);
				ns.print ("Target security modified by " + ns.nFormat (out, "0,0.00") + "!"); 
				ns.print ("Security: " + ns.nFormat (secLevel, "0,0.00"));
			}
		}
		// Bank spoofing subprocess
		bankAmount = ns.getServerMoneyAvailable (hostname)
		if (bankAmount < bankThresh) {
			ns.print ("~~~~~~~~~~~~~~~~~~~");
			ns.print ("Begin bank spoofing process of [" + hostname + "]");
			ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a") + " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
			while (bankAmount < bankThresh) {
				out = await ns.grow (hostname);
				bankAmount = ns.getServerMoneyAvailable (hostname);
				ns.print ("Target bank modified by " + ns.nFormat (out, "0,0.000") + "!");
				ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a"));
			}
		}
		// Hacking process
		ns.print ("~~~~~~~~~~~~~~~~~~~");
		ns.print ("Begin hacking attempt of " + hostname + "]");
		ns.print ("ETA: " + ns.tFormat(ns.getHackTime(hostname)));
		out = await ns.hack (hostname);
		if (out == 0) {
			ns.print ("Hack failed...");
		}else{
			ns.print ("Successfully stole $" + ns.nFormat(out, "0,0.00 a") +"!");
		}
	}
}
