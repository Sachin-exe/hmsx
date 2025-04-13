// Initialize Layout
const layout = new dhx.Layout("app", {
    type: "space",
    cols: [
        { width: "250px", id: "sidebar" },
        {
            id: "content",
            rows: [
                { id: "toolbar", height: "48px" },
                { id: "main" },
            ],
        },
    ],
});

// Sidebar
const sidebar = new dhx.Sidebar("sidebar", {
    css: "dhx_sidebar--border_right",
    data: [
        { id: "patients", value: "Patients", icon: "dxi dxi-account" },
        { id: "doctors", value: "Doctors", icon: "dxi dxi-doctor" },
        { id: "departments", value: "Departments", icon: "dxi dxi-hospital" },
    ],
});
layout.getCell("sidebar").attach(sidebar);

// Toolbar
const toolbar = new dhx.Toolbar("toolbar", {
    css: "dhx_toolbar--border_bottom",
    data: [
        { type: "input", id: "search", placeholder: "Search patients...", icon: "dxi dxi-magnify" },
        { type: "spacer" },
        { type: "button", id: "profile", value: "Profile", icon: "dxi dxi-account" },
    ],
});
layout.getCell("toolbar").attach(toolbar);

// Patient Grid
const grid = new dhx.Grid("main", {
    columns: [
        { id: "id", header: [{ text: "ID" }], width: 100 },
        { id: "name", header: [{ text: "Name" }], width: 200 },
        { id: "age", header: [{ text: "Age" }], width: 100 },
        { id: "condition", header: [{ text: "Condition" }], width: 150 },
        { id: "last_visit", header: [{ text: "Last Visit" }], width: 150 },
    ],
    adjustable: true,
    autoWidth: true,
    editable: true,
    sortable: true,
    data: [
        { id: 1, name: "John Doe", age: 45, condition: "Stable", last_visit: "2025-04-10" },
        { id: 2, name: "Jane Smith", age: 32, condition: "Critical", last_visit: "2025-04-12" },
        { id: 3, name: "Alice Johnson", age: 60, condition: "Recovering", last_visit: "2025-04-08" },
    ],
});
layout.getCell("main").attach(grid);

// Search functionality
toolbar.events.on("inputChange", (id, value) => {
    if (id === "search") {
        grid.data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    }
});

// Sidebar navigation
sidebar.events.on("click", (id) => {
    if (id === "patients") {
        layout.getCell("main").attach(grid);
    } else {
        layout.getCell("main").attachHTML(`<h2>${id} Section</h2>`);
    }
});
