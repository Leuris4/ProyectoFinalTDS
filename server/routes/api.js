const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const User = require('../models/user');
const Bill = require('../models/bills');
const Pass_type = require('../models/pass_type');
const Pass = require('../models/pass');
const Payroll = require('../models/payroll');
const TipoIngreso_Descuento = require('../models/tipoIngreso_Descuento');
const Ingresos = require('../models/ingresos');
const Descuentos = require('../models/descuentos');


//Employee Section
router.get('/employee',function(req,res,next){
    Employee.find({status: true}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.post('/employee',function(req,res,next){
    Employee.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/employee/:id',function(req,res,next){
    Employee.findOneAndUpdate({_id: req.params.id},req.body).then(function(e){
        Employee.findOne({_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
}); 

router.delete('/employee/:id',function(req,res,next){
    Employee.findOneAndDelete({_id: req.params.id}).then(function(e){
        res.send(e);
    });
});

//find employee id by cedula
router.get('/employee/id/:cedula',function(req,res,next){
    Employee.findOne({cedula: req.params.cedula, status: true }, {projection:{_id: 1}}).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

router.get('/employee/dt/:cedula',function(req,res,next){
    Employee.findOne({cedula: req.params.cedula, status: true }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

router.get('/employee/d/:id',function(req,res,next){
    Employee.findOne({_id: req.params.id, status: true }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});


/**
 *  End Employee Section
 * 
 * 
 * User Section
 */

router.get('/user',function(req,res,next){
    User.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/user/:user/:password',function(req,res,next){
    User.findOne({user: req.params.user,password: req.params.password }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

router.put('/user/:id', function(req, res) {

    User.findOneAndUpdate({_id: req.params.id},req.body).catch();
})

router.post('/user',function(req,res,next){
    User.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

module.exports = router;


/**
* End user Section
*
*
* bill Section
**/

router.post('/bill',function(req,res,next){
    Bill.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

/**
* End user bill
*
*
* pass Section
**/

router.post('/pass_type',function(req,res,next){
    Pass_type.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/pass_type',function(req,res,next){
    Pass_type.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.post('/pass',function(req,res,next){
    Pass.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/pass',function(req,res,next){
    Pass.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/pass/:id',function(req,res,next){
    Pass.findOneAndUpdate({_id: req.params.id},req.body).then(function(e){
        Pass.findOne({_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
}); 

/**
* End pass Section
*
*
* payroll Section
**/

router.post('/payroll',function(req,res,next){
    Payroll.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/payroll/:id',function(req,res,next){
    Payroll.findOneAndUpdate({employee_id: req.params.id},req.body).then(function(e){
        Payroll.findOne({employee_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
});
router.get('/payroll/:id',function(req,res,next){
    Payroll.findOne({employee_id: req.params.id}).then(function(e){
        res.send(e);
    });
});


router.get('/payroll',function(req,res,next){
    Payroll.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

/**
 * End payroll Section
 * 
 * 
 * tipoIngreso_Descuento Section
 **/

router.post('/tipoIngreso_Descuentos',function(req,res,next){
    TipoIngreso_Descuento.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/tipoIngreso_Descuentos',function(req,res,next){
    TipoIngreso_Descuento.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/tipoIngreso_Descuento/:id',function(req,res,next){
    TipoIngreso_Descuento.findOneAndUpdate({_id: req.params.id},req.body).then(function(e){
        TipoIngreso_Descuento.findOne({_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
});

router.get('/tipoIngreso_Descuentos/dt/:id',function(req,res,next){
    TipoIngreso_Descuento.findOne({_id: req.params.id, status: true }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

/**
 * End tipoIngreso_Descuento Section
 * 
 * 
 * Ingresos Section
 **/
router.post('/Ingresos',function(req,res,next){
    Ingresos.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/Ingresos',function(req,res,next){

    Ingresos.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/Ingresos/:id',function(req,res,next){
    Ingresos.findOneAndUpdate({_id: req.params.id},req.body).then(function(e){
        Ingresos.findOne({_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
});

router.get('/Ingresos/act/:id',function(req,res,next){
    Ingresos.findOne({empleado_id: req.params.id, status: 1 }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

router.get('/Ingresos/actv/:id',function(req,res,next){
    Ingresos.findOne({_id: req.params.id, status: 1 }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});

/**
 * End Ingresos Section
 * 
 * 
 * Descuentos Section
 */
router.post('/Descuentos',function(req,res,next){
    Descuentos.create(req.body).then(function(e){
        res.send(e);
    }).catch(next);
});

router.get('/Descuentos',function(req,res,next){

    Descuentos.find({}).then(function(e){
        res.send(e);
    }).catch(next);
});

router.put('/Descuentos/:id',function(req,res,next){
    Descuentos.findOneAndUpdate({_id: req.params.id},req.body).then(function(e){
        Descuentos.findOne({_id: req.params.id}).then(function(e){
            res.send(e);
        });
    });
});

router.get('/Descuentos/act/:id',function(req,res,next){
    Descuentos.findOne({empleado_id: req.params.id, status: 1 }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});
router.get('/Descuentos/actv/:id',function(req,res,next){
    Descuentos.findOne({_id: req.params.id, status: 1 }).then(function(e){
       if(e==null){
           e= []
       }
       res.send(e);
    }).catch();
});