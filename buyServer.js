/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length == 0) {
		ns.tprint ("Warning: Missing arguments, must include valid hostname and RAM amount.");
		ns.exit ();
	}
	var servers, maxServers, hostname, maxRAM, check;
	servers = ns.getPurchasedServers().length;
	maxServers = ns.getPurchasedServerLimit()
	hostname = ns.args[0];
	maxRAM = ns.args[1];

	ns.tprint ("Attempting to buy server [" + hostname + "] with " + maxRAM + " RAM");
	ns.tprint ("Current servers: " + servers + " / " + maxServers);
	ns.tprint ("Server cost: $" + ns.getPurchasedServerCost(maxRAM));
	check = await ns.prompt ("Purchace info printed in terminal, buy server?");
	if (check) {
		ns.toast ("Server [" + hostname + "] successfully bought!");
		ns.purchaseServer (hostname, maxRAM);
	}else ns.toast ("Transaction cancelled!");
}
