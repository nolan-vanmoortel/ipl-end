package exceptions

/**
 * Please catch me, I like when you catch me. I like to be extended too.
 */
class NoFatalException: RuntimeException {
    constructor(message: String): super(message)
    constructor(e: Exception): super(e)
}
