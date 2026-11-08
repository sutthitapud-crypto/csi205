"use client";

import { useState, type ReactNode } from "react";
import { initialProducts, type Product } from "@/app/data/products";
import { GlobalDataContext } from "@/app/context/GlobalData";
import type { User } from "@/app/data/users";

type Props = {
  children: ReactNode;
};

export function GlobalDataProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [carts, setCarts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  return (
    <GlobalDataContext.Provider
      value={{ products, setProducts, carts, setCarts, user, setUser }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}
