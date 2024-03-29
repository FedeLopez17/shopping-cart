import { Link, Outlet, useLocation } from "react-router-dom";
import categories from "../data/categories.json";
import { CategoryType } from "../types";
import CategoryListItem from "../components/CategoryListItem";

export default function ProductsLayout({
  closeSideBar,
  sideBarActive,
}: {
  closeSideBar: () => void;
  sideBarActive: boolean;
}) {
  const { pathname } = useLocation();
  const favoritesLinkActive = pathname.includes(`/catalog/favorites/`);

  return (
    <section className="flex justify-center bg-blue-400 flex-grow">
      <section className="w-full xl:w-[1280px] bg-green-300 flex">
        {/* The following section is a backdrop which can be clicked to deactivate the sidebar menu */}
        <section
          className={`${
            sideBarActive ? "block" : "hidden"
          } xl:hidden absolute h-full w-full bg-black opacity-30 z-20`}
          onClick={closeSideBar}
        ></section>
        <aside
          className={`bg-red-400 text-nowrap absolute h-full overflow-hidden ${
            sideBarActive ? "w-[min(280px,_100%)]" : "w-0"
          } xl:w-[280px] xl:static z-30 transition-all duration-200 ease-in`}
        >
          <nav className="">
            <ul className="flex flex-col justify-start items-start gap-3">
              <Link
                to="favorites/1"
                className={`${favoritesLinkActive ? "font-bold" : ""}`}
              >
                Favorites
              </Link>
              {categories.map((category: CategoryType) => (
                <CategoryListItem category={category} key={category.id} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-full h-min-full">
          <Outlet />
        </main>
      </section>
    </section>
  );
}
