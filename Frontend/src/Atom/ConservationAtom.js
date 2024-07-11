import {atom } from "recoil";

const ConservationAtom = atom({
    key: "Conservation",
    default: [],
})  

const selectconservationAtom = atom({
    key: "selectconservation",
    default: {
        _id: "",
        userId : "",
        username: "",
        userprofilePic: "",
    },
})

export { ConservationAtom , selectconservationAtom}