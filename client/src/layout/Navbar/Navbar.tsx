import s from "./Navbar.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksStore"
import { FaRegCircleUser, FaPlus, FaChartPie, FaListUl} from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../store/slices/userSlice";
import { BiSolidHome } from "react-icons/bi";

type FuncActiveLink = ({ isActive }: { isActive: boolean }) => string
const setActiveLink: FuncActiveLink= ({isActive})=> isActive ? s.active_link : ""

const Navbar: React.FC = () => {
  const infoUser = useAppSelector(({user})=> user.infoUser)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //Обработчик выхода из учётки
  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(logOut({isAuth: false, infoUser: null}))
    navigate("login")
  }

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
            
            <NavLink to="" className={setActiveLink}>
              <BiSolidHome/> 
              Главная
            </NavLink>
          </li>
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
          <Link to="login" onClick={handleLogout}>
            <AiOutlineLogin />
            Выйти
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
