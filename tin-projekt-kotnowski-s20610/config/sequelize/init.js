const sequelize = require('./sequelize');

const Patient = require('../../config/sequelize/Patient');
const Doctor = require('../../config/sequelize/Doctor');
const Appointment = require('../../config/sequelize/Appointment');
const Specialization = require('../../config/sequelize/Specialization');
const authUtil = require('../../util/authUtil');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Specialization.hasMany(Doctor);
    Doctor.belongsTo(Specialization);
    Doctor.hasMany(Appointment);
    Appointment.belongsTo(Doctor);
    Patient.hasMany(Appointment);
    Appointment.belongsTo(Patient);

    let allPatients, allDoctors, allSpecializations;

    return sequelize.sync({force: false})
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
                    {firstName: 'Jan', lastName: 'Bytnar', email: 'jan.bytnar@klinika.com', SpecializationId: 4, password: passHash},
                    {firstName: 'Tomasz', lastName: 'Wiśniewski', email: 'tomasz.wiśniewski@klinika.com', SpecializationId: 2, password: '54321'},
                    {firstName: 'Marcin', lastName: 'Kowal', email: 'marcin.kowal@klinika.com', SpecializationId: 3, password: 'asdjjva'},
                    {firstName: 'Anna', lastName: 'Wójcik', email: 'michal.wojcik@klinika.com', SpecializationId: 5, password: 'f23r4ga'},
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
                    {DoctorId: 1, PatientId: 1, visitDate: '2021-05-22', prescription: 'Tabletki 3x dziennie', visitDescription: 'Rutynowa kontrola'},
                    {DoctorId: 1, PatientId: 2, visitDate: '2021-06-10', prescription: 'Brak', visitDescription: 'Problemy z sercem, podłoże stresowe'},
                    {DoctorId: 4, PatientId: 3, visitDate: '2021-07-15', prescription: '', visitDescription: ''},
                    {DoctorId: 3, PatientId: 4, visitDate: '2021-05-21', prescription: '', visitDescription: ''},
                ]).then( () => {
                    return Appointment.findAll();
                });
            } else {
                return appointments;
            }
        });
};