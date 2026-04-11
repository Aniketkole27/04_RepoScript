import React from 'react'
import { LayoutDashboard, Users, Stethoscope, CalendarCheck, Settings, Bed, HandGrab, HandFist } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const RouteItems = ({ title, icon, to }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div
                    className={`flex items-center cursor-pointer gap-3 w-full rounded px-2 py-1.5 text-sm transition-all
                    ${isActive
                            ? "bg-white text-stone-950 shadow font-medium"
                            : "hover:bg-stone-200 text-stone-500"
                        }`}
                >
                    <span className={isActive ? "text-black font-bold" : ""}>
                        {icon}
                    </span>
                    <span>{title}</span>
                </div>
            )}
        </NavLink>
    )
}

const RouteSelect = () => {
    return (
        <div className='space-y-1'>

            <RouteItems
                to={"/dashboard"}
                title={"Dashboard"}
                icon={<LayoutDashboard size="16" />}
            />

            <RouteItems
                to={"/patients"}
                title={"Patients"}
                icon={<Users size="16" />}
            />

            <RouteItems
                to={"/doctors"}
                title={"Doctors"}
                icon={<Stethoscope size="16" />}
            />

            <RouteItems
                to={"/wards"}
                title={"Wards"}
                icon={<Bed size="16" />}
            />

            <RouteItems
                to={"/handoff"}
                title={"Handoff"}
                icon={<HandFist size="16" />}
            />

            <RouteItems
                to="/settings"
                title={"Settings"}
                icon={<Settings size="16" />}
            />
        </div>
    )
}

export default RouteSelect