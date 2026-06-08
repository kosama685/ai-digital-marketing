/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Package, Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  clickSales: number;
  conversionRate: number;
}

interface VisitorSession {
  id: string;
  ip: string;
  country: string;
  activeNiche: string;
  timestamp: string;
}

export default function ProductsVisitors() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [visitors, setVisitors] = useState<VisitorSession[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(49);

  useEffect(() => {
    // Products seed
    const storedProds = localStorage.getItem('nexus_products');
    if (storedProds) {
      setProducts(JSON.parse(storedProds));
    } else {
      const prods: ProductItem[] = [
        { id: '1', name: 'Premium Multi-Platform Automation Plan', price: 99, clickSales: 212, conversionRate: 4.8 },
        { id: '2', name: 'SEO & Copywriting Content Core API', price: 49, clickSales: 165, conversionRate: 5.2 }
      ];
      setProducts(prods);
      localStorage.setItem('nexus_products', JSON.stringify(prods));
    }

    // Visitors seed
    const storedVis = localStorage.getItem('nexus_visitors');
    if (storedVis) {
      setVisitors(JSON.parse(storedVis));
    } else {
      const vis: VisitorSession[] = [
        { id: 'v1', ip: '192.168.1.104', country: 'United States', activeNiche: 'Organic Nutrition', timestamp: '14:22:15' },
        { id: 'v2', ip: '84.22.115.12', country: 'United Kingdom', activeNiche: 'SaaS Metrics', timestamp: '14:26:40' },
        { id: 'v3', ip: '210.12.90.35', country: 'Canada', activeNiche: 'Health Products', timestamp: '14:31:02' }
      ];
      setVisitors(vis);
      localStorage.setItem('nexus_visitors', JSON.stringify(vis));
    }
  }, []);

  const handleRegisterProduct = () => {
    if (!newName) {
      toast.error('Product catalog title required!');
      return;
    }

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      name: newName,
      price: newPrice,
      clickSales: 0,
      conversionRate: 0.0
    };

    const updated = [...products, newProd];
    setProducts(updated);
    localStorage.setItem('nexus_products', JSON.stringify(updated));

    setNewName('');
    setShowForm(false);
    toast.success('Successfully cataloged product package SKU!');
  };

  return (
    <div className="space-y-6" id="products-visitors-view-container">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-105 flex items-center space-x-2">
            <Package className="h-5 w-5 text-indigo-400" />
            <span>Product Conversion Index & Visitor Logs</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track catalog package SKU clicks, evaluate conversion metrics on landing directories, and map incoming customer session IPs.
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 py-1.5 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-slate-100 shadow transition-all cursor-pointer"
          type="button"
          id="toggle-register-product-btn"
        >
          <PlusCircle className="h-4 w-4 mr-0.5" />
          <span>{showForm ? 'Hide Form' : 'Register SKU Package'}</span>
        </button>
      </div>

      {showForm && (
        <div className="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/30 text-left space-y-4 max-w-sm" id="product-registration-panel">
          <div className="border-b border-slate-800 pb-1 flex justify-between">
            <h4 className="text-xs font-bold text-slate-205 font-mono uppercase tracking-widest">Register Product Package</h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Package Title</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Product Package A"
                className="w-full rounded bg-slate-905 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">MSRP Pricing ($)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full rounded bg-slate-905 border border-slate-850 p-2 text-xs font-mono text-slate-202 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRegisterProduct}
              className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white"
              type="button"
            >
              Verify SKU
            </button>
          </div>
        </div>
      )}

      {/* Grid: catalog List (Left) & Visitor Sessions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="products-visitors-split-grid">
        
        {/* Products catalog list (Left 2 cols) */}
        <div className="lg:col-span-2">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left flex flex-col h-full min-h-[380px]">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Client Conversion Catalogs
            </h3>

            <div className="flex-1 overflow-x-auto min-h-0" id="conversion-products-scroller">
              <table className="w-full text-xs font-sans text-slate-355">
                <thead>
                  <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-400 text-left uppercase">
                    <th className="pb-2">Package SKU Title</th>
                    <th className="pb-2">Pricing</th>
                    <th className="pb-2 text-center">Checkout Click counts</th>
                    <th className="pb-2 text-right">Conversion Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900" id="products-metric-rows">
                  {products.map(prod => (
                    <tr key={prod.id} className="hover:bg-slate-900/30">
                      <td className="py-3 pr-2 font-semibold text-slate-200">
                        {prod.name}
                      </td>
                      <td className="py-3 font-mono text-slate-400">
                        ${prod.price}
                      </td>
                      <td className="py-3 text-center font-mono">
                        {prod.clickSales} clicks
                      </td>
                      <td className="py-3 text-right font-semibold font-mono text-indigo-400">
                        {prod.conversionRate}% er
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Visitors listings (Right 1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-full min-h-[380px] flex flex-col">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Live Session Ingress
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1" id="ingress-visitors-scroller">
              {visitors.map(vis => (
                <div key={vis.id} className="p-3 rounded-lg bg-slate-950 border border-slate-855 text-left space-y-1.5 text-xs font-sans">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">{vis.ip}</span>
                    <span className="text-indigo-400">{vis.timestamp}</span>
                  </div>
                  
                  <div className="font-semibold text-slate-200">{vis.country}</div>
                  <div className="text-[10px] font-mono text-slate-500 leading-none">Crawl Target: "{vis.activeNiche}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
