const DB = {
    user: {
        name: "Rahul",
        fullName: "Rahul Sharma",
        location: "Jaipur, Rajasthan",
        avatar: "RS"
    },
    todaySchedule: [
        { id: 1, name: "Metformin 500 mg", time: "08:00 AM", period: "Morning", status: "taken" },
        { id: 2, name: "Amlodipine 5 mg", time: "08:00 PM", period: "Night", status: "upcoming" }
    ],
    medicines: [
        { id: 1, name: "Metformin 500 mg", type: "Morning", duration: "30-day plan", expiry: "142 days remaining", status: "PRESCRIPTION MATCH", composition: "Metformin Hydrochloride", manufacturer: "Sun Pharma", batch: "MTF2401X", mfg: "Jan 2024" },
        { id: 2, name: "Amlodipine 5 mg", type: "Night", duration: "30-day plan", expiry: "180 days remaining", status: "PRESCRIPTION MATCH", composition: "Amlodipine Besylate", manufacturer: "Cipla", batch: "AML5502Y", mfg: "Feb 2024" },
        { id: 3, name: "Vitamin D3 60,000 IU", type: "Weekly", duration: "8-week plan", expiry: "42 days remaining", status: "EXPIRY ALERT", composition: "Cholecalciferol", manufacturer: "Mankind", batch: "VTD9903Z", mfg: "Mar 2024" }
    ],
    facilities: [
        { id: 1, name: "Government PHC", distance: "2.1 km", cost: "FREE", stock: "Available", type: "Government", tag: "FREE" },
        { id: 2, name: "Jan Aushadhi Kendra", distance: "3.5 km", cost: "₹8", stock: "Available", type: "Government", tag: "LOW COST" },
        { id: 3, name: "Local Pharmacy", distance: "0.8 km", cost: "₹42", stock: "Available", type: "Private", tag: "NEARBY" }
    ],
    recoveryPoints: [
        { id: 1, name: "Government PHC — Jaipur", distance: "2.1 km", type: "Government" },
        { id: 2, name: "Government Hospital — Jaipur", distance: "4.8 km", type: "Government" },
        { id: 3, name: "Participating Collection Point", distance: "3.5 km", type: "Participating" },
        { id: 4, name: "Jan Aushadhi Demo Point", distance: "3.5 km", type: "Participating" }
    ],
    family: [
        { id: 1, name: "Rahul", relation: "You", meds: 3, color: "#102A43" },
        { id: 2, name: "Father", relation: "Parent", meds: 2, color: "#159A8C" },
        { id: 3, name: "Mother", relation: "Parent", meds: 3, color: "#D89B28" },
        { id: 4, name: "Child", relation: "Son", meds: 1, color: "#64748B" }
    ],
    govStats: {
        verified: 1284,
        mismatches: 37,
        requests: 146,
        eligible: 91
    },
    govFacilities: [
        { name: "Government PHC Jaipur Rural", status: "Pilot", verification: "Active", recovery: "Active" },
        { name: "Participating Collection Point", status: "Pilot", verification: "Inactive", recovery: "Active" },
        { name: "Jan Aushadhi Demo Point", status: "Participating Demo", verification: "Active", recovery: "Inactive" }
    ]
};
