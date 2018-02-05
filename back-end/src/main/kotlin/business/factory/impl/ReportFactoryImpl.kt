package business.factory.impl

import business.entities.ReportDto
import business.factory.ReportFactory
import business.entities.impl.ReportImpl
import org.bson.Document
import org.bson.types.ObjectId
import java.time.LocalDateTime

/**
 * Object implementation of the ReportFactory.
 */
class ReportFactoryImpl : ReportFactory {
    override fun getReport(document: Document): ReportDto {
        return getReport((document.get("_id") as ObjectId).toHexString(), document.get("date") as LocalDateTime, document.getString("email"), document.getString("comment"), document.getString("emailAdmin"), document.getString("state"))
    }

    override fun getReport(id:String, date:LocalDateTime, email:String, comment:String, emailAdmin: String, state: String): ReportDto {
        return ReportImpl(id, date, email, comment, emailAdmin, state)
    }
}
