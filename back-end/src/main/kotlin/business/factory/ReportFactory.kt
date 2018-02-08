package business.factory

import business.entities.ReportDto
import org.bson.Document
import java.time.LocalDateTime

/**
 * ReportFactory is used to create new Reports.
 */
interface ReportFactory {

    /**
     * @return a new instance of Report as an ReportDto.
     * @params used to initiate the fields of the Report.
     */
    fun getReport(id:String = "", date:String = "", email: String = "",
                  comment: String = "", emailAdmin: String = "", state: Int = 0,
                  severity:Int = 0, type: Int = 0): ReportDto
    fun getReport(document : Document): ReportDto
}