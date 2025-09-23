const FinanceReport = require('../models/FinanceReport');

const addReport = async (req, res) => {
    const payload = { ...req.body, createdBy: req.user._id };
    const rep = await FinanceReport.create(payload);
    res.status(201).json(rep);
};

const listReports = async (req, res) => {
    const reports = await FinanceReport.find().populate('createdBy', 'name email');
    res.json(reports);
};

const summary = async (req, res) => {
// query optional start/end as ISO strings
    const { start, end } = req.query;
    const filter = {};
    if (start || end) filter.date = {};
    if (start) filter.date.$gte = new Date(start);
    if (end) filter.date.$lte = new Date(end);
    const incomes = await FinanceReport.aggregate([
        { $match: { ...filter, type: 'income' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expenses = await FinanceReport.aggregate([
        { $match: { ...filter, type: 'expense' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalIncome = (incomes[0] && incomes[0].total) || 0;
    const totalExpense = (expenses[0] && expenses[0].total) || 0;
    res.json({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
};


module.exports = { addReport, listReports, summary };