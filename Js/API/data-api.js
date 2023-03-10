// API -- 1 (https://d858c184-0058-4be6-8826-d26b9bd5e0b0.mock.pstmn.io/userstatus) (Default conf)
const users = {
    users: [
        {
            active_user: {
                incriment: true,
                percent: 12,
                totalUser: 20.8,
            },
        },
        {
            active_session: {
                incriment: false,
                percent: 2,
                totalSession: 25.1,
            },
        },
        {
            sessionDuration: {
                incriment: true,
                duration: 232,
                percent: 9,

            }
        }
    ]
}
// https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-12M
const users12M = {
    users: [
        {
            active_user: {
                incriment: true,
                percent: 11.5,
                totalUser: 10.8,
            },
        },
        {
            active_session: {
                incriment: false,
                percent: 5,
                totalSession: 15.1,
            },
        },
        {
            sessionDuration: {
                incriment: true,
                duration: 132,
                percent: 9,

            }
        }
    ]
}
// https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-30D
const users30D = {
    users: [
        {
            active_user: {
                incriment: true,
                percent: 30.5,
                totalUser: 1.8,
            },
        },
        {
            active_session: {
                incriment: false,
                percent: 53,
                totalSession: 25.1,
            },
        },
        {
            sessionDuration: {
                incriment: true,
                duration: 13,
                percent: 6,

            }
        }
    ]
}
// https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-7D
const users7D = {
    users: [
        {
            active_user: {
                incriment: true,
                percent: 29.5,
                totalUser: 0.8,
            },
        },
        {
            active_session: {
                incriment: false,
                percent: 59,
                totalSession: 15.1,
            },
        },
        {
            sessionDuration: {
                incriment: true,
                duration: 10,
                percent: 9,

            }
        }
    ]
}
// https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-24H
const users24H = {
    users: [
        {
            active_user: {
                incriment: true,
                percent: 9.5,
                totalUser: 0.1,
            },
        },
        {
            active_session: {
                incriment: false,
                percent: 15,
                totalSession: 5.1,
            },
        },
        {
            sessionDuration: {
                incriment: true,
                duration: 20,
                percent: 15,

            }
        }
    ]
}
// API -- 2 (https://d858c184-0058-4be6-8826-d26b9bd5e0b0.mock.pstmn.io/activeusers-by-country)
/**
 * India -- 20, australia -- 10, USA -- 30, UK -- 40, Canada -- 50
 * South Africa -- 60, New Zealand -- 70, Singapore -- 80, Malaysia -- 90,
 * 
 */
const activeUsersByCountry =
{
    totalUsers: 550,
    countries: [
        {
            country: "India",
            activeUsers: 120,
            percent: 21.82,
            office: 900,
            remote: 35,
            flexible: 65,

        },
        {
            country: "Australia",
            activeUsers: 10,
            percent: 1.82,
            office: 150,
            remote: 15,
            flexible: 5,
        },
        {
            country: "USA",
            activeUsers: 30,
            percent: 5.45,
            office: 190,
            remote: 5,
            flexible: 15,
        },
        {
            country: "UK",
            activeUsers: 40,
            percent: 7.27,
            office: 100,
            remote: 25,
            flexible: 15,
        },
        {
            country: "Canada",
            activeUsers: 50,
            percent: 9.09,
            office: 300,
            remote: 15,
            flexible: 25,
        },
        {
            country: "South Africa",
            activeUsers: 60,
            percent: 10.91,
            office: 400,
            remote: 25,
            flexible: 5,
        },
        {
            country: "New Zealand",
            activeUsers: 60,
            percent: 10.91,
            office: 200,
            remote: 55,
            flexible: 10,
        },
        {
            country: "Singapore",
            activeUsers: 80,
            percent: 14.55,
            office: 26,
            remote: 21,
            flexible: 15,
        },
        {
            country: "Singapore",
            activeUsers: 90,
            percent: 16.36,
            office: 122,
            remote: 35,
            flexible: 26,
        },
    ]
}

/**
 * API -- 3 (/barcharts)
 * 
 */

const barCharts = {
    stack1: {
        name: "number1",

    },
}