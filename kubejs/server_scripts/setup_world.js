const MODPACK_VERSION = "1.0.4"

ServerEvents.loaded(event => {
    let server = event.server
    let pData  = server.persistentData

    if(pData.getString('modpack_version') !== MODPACK_VERSION) {
        server.runCommandSilent('gamerule waterSourceConversion true')
        server.runCommandSilent('gamerule lavaSourceConversion true')
        server.runCommandSilent('gamerule randomTickSpeed 12')

        pData.putString('modpack_version', MODPACK_VERSION)
        console.info('Modpack version updated to ' + MODPACK_VERSION + ', gamerules have been applied.')
    }
})