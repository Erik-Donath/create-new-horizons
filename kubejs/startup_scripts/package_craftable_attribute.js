const PackageItem = Java.loadClass('com.simibubi.create.content.logistics.box.PackageItem')
const SingletonAttr = Java.loadClass('com.simibubi.create.content.logistics.item.filter.attribute.SingletonItemAttribute')
const SingletonType = Java.loadClass('com.simibubi.create.content.logistics.item.filter.attribute.SingletonItemAttribute$Type')
const AllDataComponents = Java.loadClass('com.simibubi.create.AllDataComponents')

const ATTRIBUTE_ID = 'package_craftable'

StartupEvents.registry('create:item_attribute_type', event => {
    event.createCustom(ATTRIBUTE_ID, () =>
        new SingletonType(type =>
            new SingletonAttr(type, (stack, level) => isCraftablePackage(stack, level), ATTRIBUTE_ID)
        )
    )
})

function getPackageOrderContextOrNull(stack) {
    if (!PackageItem.isPackage(stack)) return null

    var orderData = stack.get(AllDataComponents.PACKAGE_ORDER_DATA)
    if (orderData !== null && orderData.orderContext() !== null) {
        return orderData.orderContext()
    }

    return stack.get(AllDataComponents.PACKAGE_ORDER_CONTEXT)
}

function isCraftablePackage(stack, level) {
    var orderContext = getPackageOrderContextOrNull(stack)
    if (orderContext === null) return false

    var crafts = orderContext.orderedCrafts()
    return crafts !== null && crafts.size() > 0
}