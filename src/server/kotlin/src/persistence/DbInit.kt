package persistence

import com.mongodb.*
import ihm.PluginProperties
import org.bson.Document

/**
 * Used to initialize the data base
 */
fun main(args: Array<String>) {
    val properties = PluginProperties("src/ihm/config/prod.properties")
    val mongo = MongoClient(properties.getProperty("dbUrl"), Integer.parseInt(properties.getProperty("dbPort")))
    val database = mongo.getDatabase(properties.getProperty("dbName"))
    database.drop()
    database.createCollection("Utilisateurs")
    val collection = database.getCollection("Utilisateurs")
    val document = Document("title", "MongoDb")
            .append("id", 1)
            .append("name", "Doe")
            .append("first_name", "John")
    collection.insertOne(document)
}