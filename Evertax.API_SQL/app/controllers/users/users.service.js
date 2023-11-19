module.exports = {
    getAll:getAllusers,
    // getById,
    // create,
    // update,
    // delete: _delete
};


async function getAllusers(req,res){debugger
    try {
        await pool.connect();
        const result = await pool.request()
            .input('Name', req.query.name)
            .execute(`SearchEmployee`);
        const employees = result.recordset;

        res.json(employees);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}

async function searchUser(req,res){
    try {
        await pool.connect();
        const result = await pool.request()
            .input('Name', req.query.name)
            .execute(`SearchEmployee`);
        const employees = result.recordset;

        res.json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function status(req,res){
    try {
        await pool.connect();
        const result = await pool.request()
            .output('Count', 0)
            .output('Max', 0)
            .output('Min', 0)
            .output('Average', 0)
            .output('Sum', 0)
            .execute(`GetEmployeesStatus`);
        const status = {
            Count: +result.output.Count,
            Max: +result.output.Max,
            Min: +result.output.Min,
            Average: +result.output.Average,
            Sum: +result.output.Sum
        };

        res.json(status);
    } catch (error) {
        res.status(500).json(error);
    } 
}




async function  status_emp(req, res)  {
    try {
        await pool.connect();
        const result = await pool.request().execute(`GetSalarySummary`);
        const summary = {
            Department: result.recordsets[0],
            Job: result.recordsets[1],
        };

        res.json(summary);
    } catch (error) {
        res.status(500).json(error);
    }
};

async function many_relt(req,res)
{
    try {
        await pool.connect();
        const employeesTable = new mssql.Table();

        employeesTable.columns.add('Code', mssql.VarChar(50));
        employeesTable.columns.add('Name', mssql.VarChar(50));
        employeesTable.columns.add('Job', mssql.VarChar(50));
        employeesTable.columns.add('Salary', mssql.Int);
        employeesTable.columns.add('Department', mssql.VarChar(50));

        const employees = req.body;
        employees.forEach(employee => {
            employeesTable.rows.add(
                employee.Code,
                employee.Name,
                employee.Job,
                employee.Salary,
                employee.Department
            )
        });

        const request = pool.request();
        request.input('Employees', employeesTable);

        const result = await request.execute('AddEmployees');
        const newEmployees = result.recordset;
        res.json(newEmployees);
    } catch (error) {
        res.status(500).json(error);
    }
};