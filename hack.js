/**
* @param {NS} ns
**/
export async function main (ns) {
	ns.disableLog ("ALL");
	var hostname = ns.args[0];
	var bankThresh = ns.getServerMaxMoney(hostname)*0.7;
	var secThresh = ns.getServerMinSecurityLevel(hostname) + 5;
	var out, secLevel, bankAmount;

	ns.print ("# Begin automated farming process!")
	ns.print ("Hack ETA: " + ns.tFormat(ns.getHackTime(hostname)));
	if (hostname == "home") {
		ns.toast ("> Error: [home] is not a valid hostname.", "error");
		ns.exit();
	}
	if (!ns.serverExists (hostname)) {
		ns.toast ("> Error: [" + hostname + "] server does not exist.", "error");
		ns.exit ();
	}

	while (true) {
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
				ns.print ("Security: " + ns.nFormat (secLevel, "0,0.00") + 
					" | Hack chance: " + ns.nFormat(ns.hackAnalyzeChance (hostname), "0.00")*100 + "%");
			}
		}

		bankAmount = ns.getServerMoneyAvailable (hostname)
		if (bankAmount < bankThresh) {
			ns.print ("~~~~~~~~~~~~~~~~~~~");
			ns.print ("Begin bank spoofing process of [" + hostname + "]");
			ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a") + " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
			while (bankAmount < bankThresh) {
				out = await ns.grow (hostname);
				bankAmount = ns.getServerMoneyAvailable (hostname);
				ns.print ("Target bank spoofed for " + ns.nFormat (out, "0,0.000") + "%!");
				ns.print ("Cash: " + ns.nFormat(bankAmount, "0,0.00 a"));
			}
		}
		ns.print ("~~~~~~~~~~~~~~~~~~~");
		out = await ns.hack (hostname);
		if (out == 0) {
			ns.print ("Hack failed...");
		}else{
			ns.print ("Successfully stole $" + out +"!");
		}
	}
}
