/** @param {NS} ns **/
export async function main(ns) {

  var localhost = ns.getHostname ()
  var script = ns.args[0]
  var target = ns.args[1]
  var ramPerc = ns.args[2] || 100

  if (ns.args[0].length == 0) {
    ns.tprint ("Error: Argument [0] (script) is empty, must be a valid script name or 'help'.")
    ns.exit
  } else if (ns.args[0] == "help") {
    ns.tprint ("> optimize.js syntax")
    ns.tprint ("optimize.js (script|help) hostname ram_percentage")
    ns.tprint ("ram_percentage defaults to 100, must be an integer within 1 - 100")
    ns.exit
  }
  if (ns.args[1].length == 0) {
    ns.tprint ("Error: Argument [1] (target) is empty, must be a valid server hostname.")
    ns.exit
  }
  if (ramPerc <= 0 || ramPerc > 100) {
    ns.tprint ("Error: Argument [2] (ram_percentage) needs to be an integer between 1 and 100")
    ns.exit
  }
  if (!ns.fileExists (script, localhost)) {
    ns.tprint ("Error: Script [" + script + "] could not be found on [" + localhost + "].")
    ns.exit ()
  }
  if (!ns.serverExists (target)) {
    ns.tprint ("Error: Target host [" + target + "] does not exist.")
    ns.exit ()
  }
  
  const scriptRAM = ns.getScriptRam (script, localhost)
  const usedRAM = ns.getServerUsedRam (localhost) - ns.getScriptRam (ns.getScriptName(), localhost)
  const maxRAM = ns.getServerMaxRam (localhost)
  var availRAM = (maxRAM - usedRAM)*(ramPerc/100)
  var numThreads

  numThreads = Math.floor (availRAM/scriptRAM)
  ns.tprint ("Launching " + script + " on " + localhost + " against " + target + " using " + numThreads + " threads")
  ns.spawn (script, numThreads, target)
}
