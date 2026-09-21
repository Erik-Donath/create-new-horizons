ServerEvents.recipes(event => {
    // Shapeless recipe for 4 quartz from 1 quartz block
    event.shapeless(
        Item.of('minecraft:quartz', 4),
        [
            Item.of('minecraft:quartz_block'),
        ]
    )
})