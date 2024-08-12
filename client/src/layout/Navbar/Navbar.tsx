import s from "./Navbar.module.scss"
import { useAppSelector } from "../../hooks/hooksStore"
import { FaRegCircleUser, FaPlus, FaChartPie, FaListUl} from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

type FuncActiveLink = ({ isActive }: { isActive: boolean }) => string
const setActiveLink: FuncActiveLink= ({isActive})=> isActive ? s.active_link : ""
const Navbar = () => {
  const infoUser = useAppSelector(({user})=> user.infoUser)

  return (
    <div className={s.wrapper}>
      <div className={s.info_user}>
        <FaRegCircleUser className={s.logo}/>
        <span className={s.login}>{infoUser!.login}</span>
        <span className={s.email}>{infoUser!.email}</span>
      </div>
      <nav className={s.nav}>
        <ul className={s.list}>
          <li>
            
            <NavLink to="new-activity" className={setActiveLink}>
              <FaPlus/> 
              Новая активность
            </NavLink>
          </li>
          <li>
            <NavLink to="statistic" className={setActiveLink}>
              <FaChartPie/>
              Статистика
            </NavLink>
          </li>
          <li>

            <NavLink to="activity-list" className={setActiveLink}>
              <FaListUl />
              Активности
            </NavLink>
          </li>
        </ul>
        <div className={s.log_out}>
          <Link to="login">
            <AiOutlineLogin />
            Выйти
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
