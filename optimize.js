/** @param {NS} ns **/
export async function main(ns) {

	var hostname = ns.getHostname ();
	var script = ns.args[0] || "";
	var target = ns.args[1] || "";
	if (script == "" || target == "") {
		if (script == "") ns.tprint ("Error: Argument [0] is empty, must be a valid script name.");
		if (target == "") ns.tprint ("Error: Argument [1] is empty, must be a valid server hostname.");
		ns.exit ();
	}
	if (!ns.fileExists (script, hostname)) {
		ns.tprint ("Error: Script [" + script + "] could not be found.");
		ns.exit ();
	}
	if (!ns.serverExists (target)) {
		ns.tprint ("Error: Server [" + target + "] does not exist.");
		ns.exit ();
	}
	var scriptRAM = ns.getScriptRam (script, hostname);
	var usedRAM = ns.getServerUsedRam (hostname) - ns.getScriptRam (ns.getScriptName(), hostname);
	var maxRAM = ns.getServerMaxRam (hostname);
	var availRAM = maxRAM - usedRAM;
	var numThreads;

	var verbose = ns.args[2];

	if (verbose) {
		ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
		ns.tprint ("Hack script optimizer");
		ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
		ns.tprint ("Host: " + hostname + " | Program: " + script + " (" + scriptRAM + " GB)" + " | Target: " + target);
		ns.tprint ("Max RAM: " + maxRAM + " | Used: " + usedRAM + " | Available: " + availRAM);
		ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
	}
	numThreads = Math.floor (availRAM/scriptRAM);
	if (verbose) {
		ns.tprint ("Launching " + script + " with " + numThreads + " threads");
		ns.toast ("Launching " + script + " with " + numThreads + " threads");
	}
	ns.spawn (script, numThreads, target);
}
