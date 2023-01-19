package com.br.backend.service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.apache.commons.collections.map.HashedMap;

import java.io.InputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

@Service
public class ReportService implements Serializable {

    private static final long serialVersionUID = 8709930900834249784L;

    public byte [] generatedReport(List lisData, String reportName) throws JRException {

        HashMap<String, Object> params = new HashMap<String, Object>();


        String path = this.getClass().getClassLoader().getResource("reports/").toString();
        params.put("PARAM_SUB_ITENS",path);

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lisData);

        InputStream stream = this.getClass().getClassLoader().getResourceAsStream("reports/"+reportName+".jasper");

        JasperPrint print = JasperFillManager.fillReport(stream, params, dataSource);

        return JasperExportManager.exportReportToPdf(print);

    }

}
