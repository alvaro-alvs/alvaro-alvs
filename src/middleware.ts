


export function onRequest(context, next) {
    context.locals.title = "Welcome"


    return next()
}