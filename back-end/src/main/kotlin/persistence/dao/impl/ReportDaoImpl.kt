package persistence.dao.impl

import business.entities.ReportDto
import business.entities.ReportReal
import business.factory.ReportFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.DalServices
import org.bson.Document
import org.bson.types.ObjectId
import persistence.REPORTS_COLLECTION
import persistence.dao.ReportDao
import java.time.LocalDateTime

/**
 * Implementation of ReportDao.
 */
class ReportDaoImpl(private val dal: DalServices,
                    private val reportFactory: ReportFactory): ReportDao {

    override fun save(report: ReportDto): ReportReal {
        dal.getCollection(REPORTS_COLLECTION).insertOne(Document.parse(ObjectMapper().writeValueAsString(report)))
        return getReportByDate(report.date)
    }

    override fun getReportById(id: String): ReportReal {
        val report = dal.getCollection(REPORTS_COLLECTION).find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getReportById failed !")
        return reportFactory.getReport(report) as ReportReal
    }
    override fun getReportByDate(date: LocalDateTime): ReportReal {
        val report = dal.getCollection(REPORTS_COLLECTION).find(Document("date", date)).first()
                ?: throw NoFatalException("getReportByEMail failed !")
        return reportFactory.getReport(report) as ReportReal
    }
}
