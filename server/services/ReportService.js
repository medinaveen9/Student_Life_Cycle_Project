const ExcelJS = require("exceljs");

const generateExcel = async ({ data, currentMonth, year, user }) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Stipend Report");

    // Columns
    worksheet.columns = [
        { header: "S.No.", key: "sno", width: 5 },
        { header: "Account No.", key: "account_no", width: 20 },
        { header: "Transaction Type", key: "Transaction Type", width: 10 },
        { header: "Stipend for Month", key: "month", width: 20 },
        { header: "Amount", key: "amount", width: 15 },
    ];

    const monthsData = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",
        7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"};

    // ✅ Fallbacks if values are not passed
    const now = new Date();
    const reportMonth = currentMonth || now.toLocaleString("en-US", { month: "long" });
    const reportstudentYear = year !== "All" ? year : now.getFullYear() || now.getFullYear();
    const reportYear = now.getFullYear();
    const reportDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });


    // Add rows
    let totalAmount = 0;
    data.forEach((row, idx) => {
        const stipendAmount = Number(row.actual_stipend || 0);
        totalAmount += stipendAmount;

        worksheet.addRow({
        sno: idx + 1,
        account_no: row.account_no,
        "Transaction Type": "Credit",
        month: `${monthsData[row.cur_month]} ${reportYear}`,
        amount: stipendAmount,
        });
    });

    // Add total row
    const totalRow = worksheet.addRow({
        sno: "",
        account_no: "",
        "Transaction Type": "",
        month: "Total",
        amount: totalAmount.toLocaleString("en-IN"),
    });

    // Style total row bold
    totalRow.font = { bold: true };

    // Format amount column as currency
    worksheet.getColumn("amount").numFmt = '₹#,##0.00;[Red]-₹#,##0.00';

    // Auto filter
    worksheet.autoFilter = {
        from: 'A1',
        to: 'E1',
    };

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

module.exports = { generateExcel };
