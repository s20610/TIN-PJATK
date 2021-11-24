const sequelize = require('./sequelize');

const Patient = require('../../config/sequelize/Patient');
const Doctor = require('../../config/sequelize/Doctor');
const Appointment = require('../../config/sequelize/Appointment');
const Specialization = require('../../config/sequelize/Specialization');

module.exports = () => {
    Specialization.hasMany(Doctor, {as: 'doctor', foreignkey: {name: 'SpecializationId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Doctor.belongsTo(Specialization, {as: 'specialization', foreignkey: {name: 'SpecializationId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Doctor.hasMany(Appointment, {as: 'appointment', foreignkey: {name: 'doctorId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Appointment.belongsTo(Doctor, {as: 'doctor', foreignkey: {name: 'doctorId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Patient.hasMany(Appointment, {as: 'appointment', foreignkey: {name: 'patientId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Appointment.belongsTo(Patient, {as: 'patient', foreignkey: {name: 'patientId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});

    let allPatients, allDoctors, allSpecializations;

    return sequelize.sync({force: true})
        .then( () => {
            return Specialization.findAll();
        }).then(specs => {
            if(!specs || specs.length === 0){
                return Specialization.bulkCreate([
                    {specializationName: 'Pediatria'},
                    {specializationName: 'Alergologia'},
                    {specializationName: 'Medycyna Pracy'},
                    {specializationName: 'Kardiologia'},
                    {specializationName: 'Ginekologia'},
                    {specializationName: 'Endokrynologia'},
                ]).then( () => {
                    return Specialization.findAll();
                });
            } else {
                return specs;
            }
        }).then( specs => {
            allSpecializations = specs;
            return Doctor.findAll();
        }).then( doctors => {
            if(!doctors || doctors.length === 0){
                return Doctor.bulkCreate([
                    {firstName: 'Jan', lastName: 'Bytnar', email: 'jan.bytnar@klinika.com', specializationId: allSpecializations[3]},
                    {firstName: 'Tomasz', lastName: 'Wiśniewski', email: 'tomasz.wiśniewski@klinika.com', specializationId: allSpecializations[1]},
                    {firstName: 'Marcin', lastName: 'Kowal', email: 'marcin.kowal@klinika.com', specializationId: allSpecializations[2]},
                    {firstName: 'Anna', lastName: 'Wójcik', email: 'michal.wojcik@klinika.com', specializationId: allSpecializations[4]},
                ]).then( () => {
                    return Doctor.findAll();
                });
            } else {
                return doctors;
            }
        }).then(doctors =>{
            allDoctors = doctors;
            return Patient.findAll();
        }).then( patients => {
            if(!patients || patients.length === 0){
                return Patient.bulkCreate([
                    {firstName: 'Gniewomir', lastName: 'Lewandowski', chronicDiseases: 'Podwyższone ciśnienie', PESEL: '97062168076'},
                    {firstName: 'Marian', lastName: 'Lis', chronicDiseases: 'Brak', PESEL: '48081730557'},
                    {firstName: 'Malwina', lastName: 'Kot', chronicDiseases: 'Cukrzyca', PESEL: '64032267347'},
                    {firstName: 'Dominika', lastName: 'Grabarczyk', chronicDiseases: 'Osteoporoza', PESEL: '89091101407'},
                ]).then( () => {
                    return Patient.findAll();
                });
            } else {
                return patients;
            }
        }).then(patients =>{
            allPatients = patients;
            return Appointment.findAll();
        }).then(appointments => {
            if(!appointments || appointments.length === 0){
                return Appointment.bulkCreate([
                    {doctorId: allDoctors[0], patientId: allPatients[0], visitDate: '2021-05-22 15:10:00', prescription: 'Tabletki 3x dziennie', visitDescription: 'Rutynowa kontrola'},
                    {doctorId: allDoctors[0], patientId: allPatients[1], visitDate: '2021-06-10 14:20:00', prescription: 'Brak', visitDescription: 'Problemy z sercem, podłoże stresowe'},
                    {doctorId: allDoctors[3], patientId: allPatients[2], visitDate: '2021-07-15 13:00:00', prescription: '', visitDescription: ''},
                    {doctorId: allDoctors[2], patientId: allPatients[3], visitDate: '2021-05-21 13:30:00', prescription: '', visitDescription: ''},
                ]).then( () => {
                    return Appointment.findAll();
                });
            } else {
                return appointments;
            }
        });
};