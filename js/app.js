let currentRoute = 'splash';

const router = {
    splash: renderSplash,
    home: renderHome,
    find: renderFind,
    prescription: renderPrescription,
    verify: renderVerify,
    medicines: renderMedicines,
    recover: renderRecover,
    family: renderFamily,
    profile: renderProfile,
    gov: renderGovDashboard,
    about: renderAbout,
    // sub-routes handled internally
};

function navigate(route) {
    currentRoute = route;
    window.scrollTo(0, 0);
    renderApp();
    if (window.lucide) lucide.createIcons();
}

function renderApp() {
    const app = document.getElementById('app');
    const isGov = currentRoute === 'gov';
    
    if (isGov) {
        app.className = 'gov-shell';
        router.gov();
        return;
    } else {
        app.className = 'app-shell';
    }

    let content = `
        <div class="status-bar-safe"></div>
        <main class="content-area" id="content-area">
    `;
    
    if (currentRoute !== 'splash') {
        // Header is rendered inside specific functions for customization, 
        // but we provide a standard layout wrapper here if needed.
    }

    if (router[currentRoute]) {
        content += router[currentRoute]();
    } else {
        content += renderHome();
    }

    content += `</main>`;
    
    if (currentRoute !== 'splash') {
        content += renderBottomNav();
    }
    
    app.innerHTML = content;
    
    if (currentRoute === 'splash') {
        setTimeout(() => navigate('home'), 2200);
    }
}

// --- UI Components ---
function header(title, subtitle, showBack = false) {
    return `
        <header class="app-header">
            ${showBack ? `<button class="icon-btn" onclick="history.back()" aria-label="Back"><i data-lucide="arrow-left"></i></button>` : `<div class="avatar-sm">${DB.user.avatar}</div>`}
            <div class="header-titles">
                <h1>${title}</h1>
                ${subtitle ? `<p>${subtitle}</p>` : ''}
            </div>
            <button class="icon-btn" onclick="navigate('about')" aria-label="Notifications"><i data-lucide="bell"></i></button>
        </header>
    `;
}

function renderBottomNav() {
    const items = [
        { route: 'home', icon: 'home', label: 'Home' },
        { route: 'find', icon: 'search', label: 'Find' },
        { route: 'medicines', icon: 'pill', label: 'Medicines' },
        { route: 'recover', icon: 'recycle', label: 'Recover' },
        { route: 'profile', icon: 'user', label: 'Profile' }
    ];
    return `
        <nav class="bottom-nav">
            ${items.map(item => `
                <button class="nav-item ${currentRoute === item.route ? 'active' : ''}" onclick="navigate('${item.route}')">
                    <i data-lucide="${item.icon}"></i>
                    <span>${item.label}</span>
                </button>
            `).join('')}
        </nav>
    `;
}

function toast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const id = 'toast-' + Date.now();
    const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info';
    const color = type === 'success' ? 'var(--success)' : type === 'warning' ? 'var(--warning)' : 'var(--navy)';
    
    container.innerHTML += `
        <div class="toast" id="${id}" style="border-left: 4px solid ${color}">
            <i data-lucide="${icon}" style="color: ${color}"></i>
            <span>${message}</span>
        </div>
    `;
    lucide.createIcons();
    
    setTimeout(() => {
        document.getElementById(id).remove();
    }, 3000);
}

function modal(content) {
    document.getElementById('modal-container').innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                ${content}
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('modal-container').innerHTML = '';
}

// --- Pages ---

function renderSplash() {
    return `
        <div class="splash-screen">
            <div class="splash-logo">
                <div class="cross-icon"><i data-lucide="plus"></i></div>
                <div class="scan-frame"><i data-lucide="scan-line"></i></div>
            </div>
            <h1 class="splash-title">MedScan+</h1>
            <p class="splash-subtitle">Smart Medicine Safety & Recovery Platform</p>
            <div class="splash-tagline">
                <p>Verify what you take.</p>
                <p>Manage how you take it.</p>
                <p>Recover what you don't.</p>
            </div>
            <div class="splash-footer">RAJASTHAN IDEATHON 2026</div>
        </div>
    `;
}

function renderHome() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles">
                <h1>Good morning, ${DB.user.name}</h1>
                <p>${DB.user.location}</p>
            </div>
            <button class="icon-btn" onclick="navigate('about')"><i data-lucide="bell"></i></button>
        </header>
        
        <main class="content-area">
            <!-- Journey -->
            <section class="card journey-card">
                <h3>Your Medicine Journey</h3>
                <div class="journey-steps">
                    <div class="step"><span>01</span> Find</div>
                    <div class="step-line"></div>
                    <div class="step"><span>02</span> Verify</div>
                    <div class="step-line"></div>
                    <div class="step"><span>03</span> Manage</div>
                    <div class="step-line"></div>
                    <div class="step"><span>04</span> Recover</div>
                </div>
            </section>

            <!-- Quick Actions -->
            <h3 class="section-title">Quick Actions</h3>
            <div class="grid-2x2">
                <div class="action-card" onclick="navigate('find')">
                    <div class="action-icon"><i data-lucide="search"></i></div>
                    <h4>Find Medicine</h4>
                    <p>Search nearby sources</p>
                </div>
                <div class="action-card" onclick="navigate('prescription')">
                    <div class="action-icon"><i data-lucide="scan-line"></i></div>
                    <h4>Scan Prescription</h4>
                    <p>Convert to plan</p>
                </div>
                <div class="action-card" onclick="navigate('verify')">
                    <div class="action-icon"><i data-lucide="shield-check"></i></div>
                    <h4>Verify Medicine</h4>
                    <p>Check match</p>
                </div>
                <div class="action-card" onclick="navigate('recover')">
                    <div class="action-icon"><i data-lucide="recycle"></i></div>
                    <h4>Recover Medicine</h4>
                    <p>Return unused</p>
                </div>
            </div>

            <!-- Today's Meds -->
            <h3 class="section-title">Today</h3>
            ${DB.todaySchedule.map(med => `
                <div class="card med-card">
                    <div class="med-info">
                        <h4>${med.name}</h4>
                        <p>${med.time} • ${med.period}</p>
                    </div>
                    <div class="med-action">
                        ${med.status === 'taken' ? 
                            `<span class="badge-success"><i data-lucide="check"></i> Taken</span>` : 
                            `<button class="btn-sm btn-primary" onclick="markTaken(${med.id})">Mark Taken</button>`
                        }
                    </div>
                </div>
            `).join('')}

            <!-- Alert -->
            <div class="card alert-card">
                <div class="alert-icon"><i data-lucide="alert-triangle"></i></div>
                <div>
                    <h4>Medicine Alert: Vitamin D3</h4>
                    <p>Expires in 42 days.</p>
                </div>
                <button class="btn-sm btn-ghost" onclick="navigate('medicines')">View</button>
            </div>

            <!-- Recovery CTA -->
            <div class="card recovery-cta">
                <div>
                    <h4>Close the Loop</h4>
                    <p>Have unused medicine left? Check eligibility for return.</p>
                </div>
                <button class="btn-sm btn-teal" onclick="navigate('recover')">Check</button>
            </div>
        </main>
    `;
}

function renderFind() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles">
                <h1>Find Medicine</h1>
                <p>Find available sources near you</p>
            </div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="search-bar">
                <i data-lucide="search"></i>
                <input type="text" placeholder="e.g. Metformin 500 mg" value="Metformin 500 mg" readonly>
                <i data-lucide="scan-line" onclick="navigate('verify')"></i>
            </div>
            <p class="demo-note"><i data-lucide="info"></i> Availability shown is simulated for this prototype.</p>
            
            <div class="filters">
                <button class="filter active">Nearest</button>
                <button class="filter">Lowest Cost</button>
                <button class="filter">Free First</button>
            </div>

            <h3 class="section-title">Demo Availability</h3>
            ${DB.facilities.map(f => `
                <div class="card facility-card" onclick="showFacilityDetail(${f.id})">
                    <div class="facility-icon"><i data-lucide="hospital"></i></div>
                    <div class="facility-info">
                        <h4>${f.name}</h4>
                        <p>${f.distance} • ${f.cost}</p>
                    </div>
                    <span class="badge-${f.tag.toLowerCase().replace(' ', '-')}">${f.tag}</span>
                </div>
            `).join('')}
        </main>
    `;
}

function showFacilityDetail(id) {
    const f = DB.facilities.find(x => x.id === id);
    modal(`
        <div class="sheet-header">
            <h3>${f.name} — Jaipur</h3>
            <button onclick="closeModal()"><i data-lucide="x"></i></button>
        </div>
        <div class="sheet-body">
            <div class="info-row"><span>Distance</span><span>${f.distance}</span></div>
            <div class="info-row"><span>Medicine</span><span>Metformin 500 mg</span></div>
            <div class="info-row"><span>Demo Availability</span><span class="text-success">Available</span></div>
            <div class="info-row"><span>Cost</span><span>${f.cost}</span></div>
            <div class="info-note">Live navigation is not connected in this offline prototype.</div>
            <button class="btn btn-primary" onclick="closeModal(); toast('Opening details...')">View Details</button>
            <button class="btn btn-ghost" onclick="closeModal(); toast('Navigation simulated.', 'info')">Directions</button>
        </div>
    `);
}

function renderPrescription() {
    return `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('home')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Scan Prescription</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <p class="section-subtitle">Turn your prescription into a structured medicine plan.</p>
            <div class="scanner-area">
                <div class="scanner-frame">
                    <div class="corner tl"></div><div class="corner tr"></div>
                    <div class="corner bl"></div><div class="corner br"></div>
                    <p>Align prescription within frame</p>
                </div>
            </div>
            <div class="presc-actions">
                <button class="btn btn-ghost"><i data-lucide="camera"></i> Camera</button>
                <button class="btn btn-ghost"><i data-lucide="image"></i> Upload</button>
            </div>
            <button class="btn btn-primary btn-block" onclick="simulateScan()">Try Demo Prescription</button>
        </main>
    `;
}

function simulateScan() {
    document.getElementById('content-area').innerHTML = `
        <div class="loading-state">
            <div class="loader"></div>
            <h3>Reading prescription...</h3>
            <p>Extracting medicine information...</p>
        </div>
    `;
    setTimeout(() => {
        document.getElementById('content-area').innerHTML = `
            <header class="app-header">
                <button class="icon-btn" onclick="navigate('home')"><i data-lucide="arrow-left"></i></button>
                <div class="header-titles"><h1>Prescription Found</h1></div>
                <div style="width:44px"></div>
            </header>
            <main class="content-area">
                <div class="card patient-card">
                    <div class="avatar-sm">RS</div>
                    <div>
                        <h4>Rahul Sharma</h4>
                        <p>Prescribed: 12 Aug 2026</p>
                    </div>
                </div>
                
                <h3 class="section-title">Medicines</h3>
                <div class="card med-extracted">
                    <div><h4>1. Metformin</h4><p>500 mg • As directed • 30 days</p></div>
                    <span class="badge-success">High Confidence</span>
                </div>
                <div class="card med-extracted">
                    <div><h4>2. Amlodipine</h4><p>5 mg • Once daily • 30 days</p></div>
                    <span class="badge-success">High Confidence</span>
                </div>
                
                <div class="warning-note">
                    <i data-lucide="info"></i> Please verify unclear prescription information with a qualified healthcare professional.
                </div>
                
                <button class="btn btn-primary btn-block" onclick="navigate('medicines'); toast('Medicine plan created successfully')">Create Medicine Plan</button>
            </main>
        `;
        lucide.createIcons();
    }, 2500);
}

function renderVerify() {
    return `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('home')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Verify Medicine</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <p class="section-subtitle">Check whether the medicine matches the prescription.</p>
            
            <div class="stepper">
                <div class="step active"><span>01</span> Prescription</div>
                <div class="step-line active"></div>
                <div class="step"><span>02</span> Medicine</div>
                <div class="step-line"></div>
                <div class="step"><span>03</span> Match</div>
            </div>

            <div class="card prescription-match-card">
                <h4>Metformin</h4>
                <p>500 mg</p>
            </div>

            <button class="btn btn-primary btn-block" onclick="simulateVerify('match')"><i data-lucide="scan-line"></i> Scan Medicine Pack</button>
            <button class="btn btn-ghost btn-block" onclick="simulateVerify('match')">Use Demo Medicine</button>
            <button class="btn btn-outline btn-block" onclick="simulateVerify('mismatch')">Try Mismatch Demo</button>
        </main>
    `;
}

function simulateVerify(type) {
    const isMatch = type === 'match';
    document.getElementById('content-area').innerHTML = `
        <div class="loading-state">
            <div class="scanner-area small">
                <div class="scanner-frame active">
                    <div class="corner tl"></div><div class="corner tr"></div>
                    <div class="corner bl"></div><div class="corner br"></div>
                    <div class="scan-line"></div>
                </div>
            </div>
            <h3>Reading medicine pack...</h3>
        </div>
    `;
    setTimeout(() => {
        document.getElementById('content-area').innerHTML = isMatch ? renderMatch() : renderMismatch();
        lucide.createIcons();
    }, 2500);
}

function renderMatch() {
    return `
        <header class="app-header"><div style="width:44px"></div><div class="header-titles"><h1>Verification Result</h1></div><div style="width:44px"></div></header>
        <main class="content-area result-page">
            <div class="result-icon success"><i data-lucide="check"></i></div>
            <h2>Prescription Match</h2>
            
            <div class="card comparison-card">
                <div><p class="label">Prescription</p><h3>Metformin</h3><p>500 mg</p></div>
                <div class="divider"><i data-lucide="check"></i></div>
                <div><p class="label">Scanned</p><h3>Metformin</h3><p>500 mg</p></div>
            </div>
            
            <div class="info-box">
                <p><strong>Status:</strong> MATCH</p>
                <p>Medicine name and strength match the selected prescription.</p>
            </div>

            <button class="btn btn-primary btn-block" onclick="navigate('medicines'); toast('Medicine added to plan')">Add to Medicine Plan</button>
            <button class="btn btn-ghost btn-block" onclick="navigate('medicines')">View Medicine Details</button>
        </main>
    `;
}

function renderMismatch() {
    return `
        <header class="app-header"><div style="width:44px"></div><div class="header-titles"><h1>Verification Result</h1></div><div style="width:44px"></div></header>
        <main class="content-area result-page">
            <div class="result-icon warning"><i data-lucide="alert-triangle"></i></div>
            <h2>Possible Mismatch</h2>
            
            <div class="card comparison-card">
                <div><p class="label">Prescription</p><h3>Metformin</h3><p>500 mg</p></div>
                <div class="divider warn"><i data-lucide="x"></i></div>
                <div><p class="label">Scanned</p><h3>Metformin</h3><p>250 mg</p></div>
            </div>
            
            <div class="info-box warning">
                <p><strong>Status:</strong> POSSIBLE MISMATCH</p>
                <p>Reason: Strength does not match the selected prescription.</p>
            </div>

            <div class="danger-note">
                <i data-lucide="shield-alert"></i> Do not rely on the app alone. Confirm with a pharmacist or qualified healthcare professional.
            </div>

            <button class="btn btn-warning btn-block" onclick="toast('Please consult pharmacist', 'warning')">Verify Before Use</button>
        </main>
    `;
}

function renderMedicines() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles"><h1>My Medicines</h1></div>
            <button class="icon-btn"><i data-lucide="plus"></i></button>
        </header>
        <main class="content-area">
            <div class="summary-row">
                <div class="summary-card"><h3>3</h3><p>Active</p></div>
                <div class="summary-card"><h3>1</h3><p>Reminder</p></div>
                <div class="summary-card"><h3>1</h3><p>Expiry Alert</p></div>
            </div>

            <div class="week-selector">
                <span>Mon</span><span>Tue</span><span class="active">Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            <h3 class="section-title">Today's Schedule</h3>
            ${DB.todaySchedule.map(med => `
                <div class="card med-card">
                    <div class="med-time">
                        <strong>${med.time}</strong>
                    </div>
                    <div class="med-info">
                        <h4>${med.name}</h4>
                        <p>${med.period}</p>
                    </div>
                    <div class="med-action">
                        ${med.status === 'taken' ? 
                            `<span class="badge-success"><i data-lucide="check"></i> Taken</span>` : 
                            `<button class="btn-sm btn-primary" onclick="markTaken(${med.id})">Mark Taken</button>
                             <button class="btn-sm btn-ghost">Snooze</button>`
                        }
                    </div>
                </div>
            `).join('')}

            <h3 class="section-title">All Medicines</h3>
            ${DB.medicines.map(m => `
                <div class="card med-list-card" onclick="showMedDetails(${m.id})">
                    <div class="med-icon"><i data-lucide="pill"></i></div>
                    <div style="flex:1">
                        <h4>${m.name}</h4>
                        <p>${m.type} • ${m.duration}</p>
                    </div>
                    <i data-lucide="chevron-right" style="color: var(--text-muted)"></i>
                </div>
            `).join('')}
            
            <div class="adherence-card card">
                <h4>7 Day Overview</h4>
                <div class="dots">
                    <span class="taken"></span><span class="taken"></span><span class="taken"></span>
                    <span class="taken"></span><span class="taken"></span><span class="taken"></span>
                    <span class="missed"></span>
                </div>
                <p>6 / 7 doses recorded • Demo tracking data</p>
            </div>
        </main>
    `;
}

function showMedDetails(id) {
    const m = DB.medicines.find(x => x.id === id);
    modal(`
        <div class="sheet-header">
            <h3>${m.name}</h3>
            <button onclick="closeModal()"><i data-lucide="x"></i></button>
        </div>
        <div class="sheet-body">
            <span class="badge-success" style="display:inline-block; margin-bottom:16px">${m.status}</span>
            <div class="info-row"><span>Composition</span><span>${m.composition}</span></div>
            <div class="info-row"><span>Manufacturer</span><span>${m.manufacturer}</span></div>
            <div class="info-row"><span>Batch</span><span>${m.batch}</span></div>
            <div class="info-row"><span>Mfg Date</span><span>${m.mfg}</span></div>
            <div class="info-row"><span>Expiry</span><span>${m.expiry}</span></div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: 70%"></div>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin: 8px 0 24px;">142 days remaining</p>

            <button class="btn btn-ghost btn-block" onclick="closeModal()">Close</button>
        </div>
    `);
}

function renderRecover() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles"><h1>Recover Unused Medicine</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="hero-recovery">
                <i data-lucide="recycle"></i>
                <h3>Close the Loop</h3>
                <p>Have medicine left after treatment? Check whether it may be eligible for responsible return.</p>
            </div>

            <div class="stepper">
                <div class="step active"><span>01</span> Scan</div>
                <div class="step-line active"></div>
                <div class="step active"><span>02</span> Check</div>
                <div class="step-line active"></div>
                <div class="step"><span>03</span> Return</div>
                <div class="step-line"></div>
                <div class="step"><span>04</span> Record</div>
            </div>

            <button class="btn btn-primary btn-block" onclick="checkEligibility()">Check Eligibility</button>
            <button class="btn btn-ghost btn-block" onclick="viewHistory()">View Recovery History</button>
        </main>
    `;
}

function checkEligibility() {
    document.getElementById('content-area').innerHTML = `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('recover')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Recovery Eligibility</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="card med-list-card"><h4>Metformin 500 mg</h4></div>
            
            <h3 class="section-title">Checklist</h3>
            <div class="check-list">
                <div class="check-item"><i data-lucide="check"></i> Packaging sealed</div>
                <div class="check-item"><i data-lucide="check"></i> Batch identifiable</div>
                <div class="check-item"><i data-lucide="check"></i> Expiry sufficiently far away</div>
                <div class="check-item"><i data-lucide="check"></i> Medicine identified</div>
                <div class="check-item"><i data-lucide="check"></i> Storage condition known</div>
            </div>

            <div class="info-box success-box">
                <p><strong>POTENTIALLY ELIGIBLE</strong></p>
                <p>Final acceptance is determined by the authorized receiving facility.</p>
            </div>

            <button class="btn btn-primary btn-block" onclick="findReturnPoints()">Find Return Point</button>
        </main>
    `;
    lucide.createIcons();
}

function findReturnPoints() {
    document.getElementById('content-area').innerHTML = `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('recover')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Return Points</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="map-mockup">
                <i data-lucide="map-pin"></i>
                <p>Offline Prototype Map</p>
            </div>
            
            <div class="filters">
                <button class="filter active">Government</button>
                <button class="filter">Participating</button>
                <button class="filter">Collection</button>
            </div>

            ${DB.recoveryPoints.map(p => `
                <div class="card facility-card" onclick="confirmReturn('${p.name}')">
                    <div class="facility-icon"><i data-lucide="map-pin"></i></div>
                    <div class="facility-info">
                        <h4>${p.name}</h4>
                        <p>${p.distance} • ${p.type}</p>
                    </div>
                    <button class="btn-sm btn-ghost">Select</button>
                </div>
            `).join('')}
        </main>
    `;
    lucide.createIcons();
}

function confirmReturn(name) {
    const id = "MSR-2026-" + Math.floor(400 + Math.random() * 100);
    document.getElementById('content-area').innerHTML = `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('home')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Recovery Confirmation</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area center-content">
            <div class="card confirm-card">
                <h3>${name}</h3>
                <p>Metformin 500 mg</p>
                <div class="qr-mockup">
                    <div class="qr-pattern"></div>
                </div>
                <p class="return-id">${id}</p>
                <p class="demo-note">Present this code at the participating facility.</p>
                <button class="btn btn-primary btn-block" onclick="simulateStaffVerification()">Simulate Staff Verification</button>
            </div>
        </main>
    `;
    lucide.createIcons();
}

function simulateStaffVerification() {
    document.getElementById('content-area').innerHTML = `
        <main class="content-area center-content" style="padding-top: 40px;">
            <div class="result-icon success big"><i data-lucide="check"></i></div>
            <h2>Drop-off Recorded</h2>
            <p style="color: var(--text-muted); margin-bottom: 32px;">Status: Received for facility verification</p>
            <div class="info-box">
                <p>Final reuse or disposal decision is made by authorized personnel.</p>
            </div>
            <button class="btn btn-primary btn-block" onclick="navigate('home'); toast('Recovery recorded successfully')">Done</button>
        </main>
    `;
    lucide.createIcons();
}

function viewHistory() {
    document.getElementById('content-area').innerHTML = `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('recover')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>Recovery History</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="timeline">
                <div class="t-item">
                    <div class="t-dot success"></div>
                    <div class="card">
                        <h4>12 AUG 2026</h4>
                        <p>Metformin 500 mg</p>
                        <span class="badge-success">Returned</span>
                    </div>
                </div>
                <div class="t-item">
                    <div class="t-dot danger"></div>
                    <div class="card">
                        <h4>10 JUL 2026</h4>
                        <p>Vitamin D3</p>
                        <span class="badge-danger">Not Eligible</span>
                        <p class="reason">Reason: Packaging condition</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-ghost btn-block" onclick="navigate('recover')">Back to Recovery</button>
        </main>
    `;
    lucide.createIcons();
}

function renderFamily() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles"><h1>Family Mode</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <p class="section-subtitle">Keep family medicine schedules organized.</p>
            <div class="family-grid">
                ${DB.family.map(f => `
                    <div class="card family-card">
                        <div class="f-avatar" style="background:${f.color}">${f.name.charAt(0)}</div>
                        <h4>${f.name}</h4>
                        <p>${f.relation}</p>
                        <span class="badge-info">${f.meds} medicines</span>
                    </div>
                `).join('')}
            </div>
        </main>
    `;
}

function renderProfile() {
    return `
        <header class="app-header">
            <div class="avatar-sm">${DB.user.avatar}</div>
            <div class="header-titles"><h1>Profile</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="profile-header">
                <div class="p-avatar">RS</div>
                <h3>Rahul Sharma</h3>
                <p>Jaipur, Rajasthan</p>
            </div>
            
            <div class="menu-list">
                <div class="menu-item" onclick="navigate('medicines')"><i data-lucide="pill"></i> My Medicines <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="navigate('family')"><i data-lucide="users"></i> Family Mode <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="navigate('recover')"><i data-lucide="recycle"></i> Recovery History <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="navigate('about')"><i data-lucide="bell"></i> Notifications <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="navigate('find')"><i data-lucide="bookmark"></i> Saved Facilities <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="toast('Privacy settings are demo only', 'info')"><i data-lucide="lock"></i> Privacy <i data-lucide="chevron-right"></i></div>
                <div class="menu-item" onclick="navigate('about')"><i data-lucide="info"></i> About MedScan+ <i data-lucide="chevron-right"></i></div>
            </div>

            <div class="gov-access">
                <button class="btn btn-outline btn-block" onclick="navigate('gov')">
                    <i data-lucide="landmark"></i> Government Dashboard Access
                </button>
                <p>Demo Mode • Prototype stores data locally on this device.</p>
            </div>
        </main>
    `;
}

function renderAbout() {
    return `
        <header class="app-header">
            <button class="icon-btn" onclick="navigate('home')"><i data-lucide="arrow-left"></i></button>
            <div class="header-titles"><h1>About / Safety</h1></div>
            <div style="width:44px"></div>
        </header>
        <main class="content-area">
            <div class="about-hero">
                <i data-lucide="plus"></i>
                <h2>MedScan+</h2>
                <p>Smart Medicine Safety & Recovery Platform</p>
            </div>

            <div class="card">
                <h4>What is MedScan+?</h4>
                <p>A prototype connecting four stages: Find, Verify, Manage, and Recover medicines.</p>
            </div>

            <div class="warning-note">
                <i data-lucide="shield-alert"></i> 
                <div>
                    <p>MedScan+ does not diagnose illness, prescribe medicines or replace qualified healthcare professionals.</p>
                    <p>Medicine recovery is subject to eligibility checks and authorized facility rules.</p>
                    <p>Prototype data is simulated.</p>
                </div>
            </div>
        </main>
    `;
}

// --- Government Dashboard ---
function renderGovDashboard() {
    return `
        <div class="gov-layout">
            <aside class="sidebar">
                <h2>MedScan+</h2>
                <span class="badge-info">DEMO DATA</span>
                <nav>
                    <button class="active"><i data-lucide="layout-dashboard"></i> Overview</button>
                    <button><i data-lucide="shield-check"></i> Safety Analytics</button>
                    <button><i data-lucide="recycle"></i> Recovery Analytics</button>
                    <button><i data-lucide="hospital"></i> Facilities</button>
                    <button><i data-lucide="file-text"></i> Reports</button>
                </nav>
                <button class="btn btn-ghost btn-block" onclick="navigate('home')"><i data-lucide="log-out"></i> Exit Dashboard</button>
            </aside>
            
            <div class="gov-main">
                <header class="gov-header">
                    <div>
                        <h1>Government Health Dashboard</h1>
                        <p>Rajasthan Pilot • Jaipur District</p>
                    </div>
                    <div class="date-picker">Aug 2026</div>
                </header>

                <div class="kpi-grid">
                    <div class="kpi-card">
                        <p>Medicines Verified</p>
                        <h2>1,284</h2>
                        <span class="badge-success">DEMO DATA</span>
                    </div>
                    <div class="kpi-card">
                        <p>Possible Mismatches</p>
                        <h2>37</h2>
                        <span class="badge-warning">DEMO DATA</span>
                    </div>
                    <div class="kpi-card">
                        <p>Recovery Requests</p>
                        <h2>146</h2>
                        <span class="badge-info">DEMO DATA</span>
                    </div>
                    <div class="kpi-card">
                        <p>Eligible Returns</p>
                        <h2>91</h2>
                        <span class="badge-success">DEMO DATA</span>
                    </div>
                </div>

                <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Medicine Safety Overview</h3>
                        <div class="bar-chart">
                            <div class="bar-row"><span>Match</span><div class="bar-bg"><div class="bar-fill success" style="width: 94%"></div></div><span>94%</span></div>
                            <div class="bar-row"><span>Mismatch</span><div class="bar-bg"><div class="bar-fill warning" style="width: 4%"></div></div><span>4%</span></div>
                            <div class="bar-row"><span>Needs Verification</span><div class="bar-bg"><div class="bar-fill neutral" style="width: 2%"></div></div><span>2%</span></div>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h3>Recovery Overview</h3>
                        <div class="bar-chart">
                            <div class="bar-row"><span>Eligible</span><div class="bar-bg"><div class="bar-fill success" style="width: 62%"></div></div><span>91</span></div>
                            <div class="bar-row"><span>Not Eligible</span><div class="bar-bg"><div class="bar-fill danger" style="width: 38%"></div></div><span>55</span></div>
                        </div>
                    </div>
                </div>

                <div class="chart-card" style="margin-top: 24px;">
                    <h3>Facility Activity</h3>
                    <table class="data-table">
                        <thead><tr><th>Facility</th><th>Status</th><th>Verification</th><th>Recovery</th></tr></thead>
                        <tbody>
                            ${DB.govFacilities.map(f => `
                                <tr>
                                    <td>${f.name}</td>
                                    <td><span class="badge-info">${f.status}</span></td>
                                    <td>${f.verification}</td>
                                    <td>${f.recovery}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// --- Global Actions ---
function markTaken(id) {
    const med = DB.todaySchedule.find(m => m.id === id);
    if (med) med.status = 'taken';
    toast('Dose marked as taken');
    renderApp();
}

// Init
window.addEventListener('load', () => {
    if (window.lucide) lucide.createIcons();
    renderApp();
});
