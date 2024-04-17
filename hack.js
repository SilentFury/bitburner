/**
* @param {NS} ns
**/
export async function main (ns) {
	ns.disableLog ("ALL");
	var hostname = ns.args[0];

	// Hostname validation
	if (ns.args.length == 0) {
		ns.tprint ("Error: Missing arguments, must have a valid hostname.");
		ns.exit ();
	}
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
      ns.print ("Minimum Security: " + ns.formatNumber (ns.getServerMinSecurityLevel(hostname), 2, 1000, false) 
      + " | Threshold: " + ns.formatNumber (secThresh, 2, 1000, false));
			ns.print ("Current security: " + ns.formatNumber (secLevel, 2, 1000, false) + 
			" | ETA: " + ns.tFormat(ns.getGrowTime(hostname)));
			while (secLevel > secThresh) {
				out = await ns.weaken (hostname);
				secLevel = ns.getServerSecurityLevel (hostname);
				ns.print ("Target security modified by " + ns.formatNumber (out, 2, 1000, false) + "!"); 
				ns.print ("Current security: " + ns.formatNumber (secLevel, 2, 1000, false));
			}
		}
		// Bank spoofing subprocess
		bankAmount = ns.getServerMoneyAvailable (hostname)
		if (bankAmount < bankThresh) {
			ns.print ("~~~~~~~~~~~~~~~~~~~");
			ns.print ("Begin bank spoofing process of [" + hostname + "]");
      ns.print ("Max Cash: " + ns.formatNumber (ns.getServerMaxMoney(hostname), 2, 1000, false) 
      + " | Threshold: " + ns.formatNumber (bankThresh, 2, 1000, false));
			ns.print ("Current cash: $" + ns.formatNumber(bankAmount, 2, 1000, false) + 
      " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
			while (bankAmount < bankThresh) {
				out = await ns.grow (hostname);
				bankAmount = ns.getServerMoneyAvailable (hostname);
				ns.print ("Target bank modified by " + ns.formatNumber (out, 4, 1000, false) + "%!");
				ns.print ("Cash: $" + ns.formatNumber (bankAmount, 2, 1000, false));
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
			ns.print ("Successfully stole $" + ns.formatNumber (out, 2, 1000, false) +"!");
		}
	}
}
