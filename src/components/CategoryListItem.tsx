import { Link, useLocation } from "react-router-dom";
import { CategoryType } from "../types";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SubCategoryListItem from "./SubCategoryListItem";

export default function CategoryListItem({
  category,
}: {
  category: CategoryType;
}) {
  const [visibleSubCategories, setVisibleSubCategories] = useState(false);
  const { pathname } = useLocation();

  const categoryLinkTo = `/catalog/${category.id}/1`;
  const categoryLinkActive = pathname.includes(`/catalog/${category.id}/`);

  return (
    <li className="w-full">
      <section className="flex items-center justify-between">
        <Link
          to={categoryLinkTo}
          className={`${categoryLinkActive ? "font-bold" : ""}`}
        >
          {category.name}
        </Link>
        {visibleSubCategories ? (
          <FaAngleUp onClick={() => setVisibleSubCategories(false)} />
        ) : (
          <FaAngleDown onClick={() => setVisibleSubCategories(true)} />
        )}
      </section>
      {visibleSubCategories && (
        <ul>
          {category.subCategories.map((subCategory) => (
            <SubCategoryListItem
              key={subCategory.id}
              subCategory={subCategory}
              categoryId={category.id}
              pathname={pathname}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
