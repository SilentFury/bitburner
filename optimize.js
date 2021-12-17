/** @param {NS} ns **/
export async function main(ns) {
    var script = ns.args[0] + ".js";
	var target = ns.args[1];
	var hostname = ns.getHostname ();
	var scriptRAM = ns.getScriptRam (script, hostname);
	var usedRAM = ns.getServerUsedRam (hostname) - ns.getScriptRam (ns.getScriptName(), hostname);
	var maxRAM = ns.getServerMaxRam (hostname);
	var availRAM = maxRAM - usedRAM;
	var numThreads;

	ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
	ns.tprint ("Hack script optimizer");
	ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
	ns.tprint ("Host: " + hostname + " | Program: " + script + " (" + scriptRAM + " GB)" + " | Target: " + target);
	ns.tprint ("Max RAM: " + maxRAM + " | Used: " + usedRAM + " | Available: " + availRAM);
	ns.tprint ("~~~~~~~~~~~~~~~~~~~~~");
	numThreads = Math.floor (availRAM/scriptRAM);
	ns.tprint ("Launching " + script + " with " + numThreads + " threads");
	ns.toast ("Launching " + script + " with " + numThreads + " threads");
	ns.spawn (script, numThreads, target);
}
