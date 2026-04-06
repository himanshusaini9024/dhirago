export default function MensSizeChart() {
const topsSizes = [
{ size: 'XS', chestIn: '34–36', chestCm: '86–91', waistIn: '28–30', waistCm: '71–76' },
{ size: 'S', chestIn: '36–38', chestCm: '91–97', waistIn: '30–32', waistCm: '76–81' },
{ size: 'M', chestIn: '38–40', chestCm: '97–102', waistIn: '32–34', waistCm: '81–86' },
{ size: 'L', chestIn: '40–42', chestCm: '102–107', waistIn: '34–36', waistCm: '86–91' },
{ size: 'XL', chestIn: '42–44', chestCm: '107–112', waistIn: '36–38', waistCm: '91–97' },
{ size: 'XXL', chestIn: '44–46', chestCm: '112–117', waistIn: '38–40', waistCm: '97–102' },
{ size: 'XXXL', chestIn: '46–48', chestCm: '117–122', waistIn: '40–42', waistCm: '102–107' },
];

const bottomsSizes = [
{ size: 'XS', waistIn: '28–30', waistCm: '71–76', hipIn: '34–36', hipCm: '86–91', inseamIn: '30', inseamCm: '76' },
{ size: 'S', waistIn: '30–32', waistCm: '76–81', hipIn: '36–38', hipCm: '91–97', inseamIn: '31', inseamCm: '79' },
{ size: 'M', waistIn: '32–34', waistCm: '81–86', hipIn: '38–40', hipCm: '97–102', inseamIn: '32', inseamCm: '81' },
{ size: 'L', waistIn: '34–36', waistCm: '86–91', hipIn: '40–42', hipCm: '102–107', inseamIn: '33', inseamCm: '84' },
{ size: 'XL', waistIn: '36–38', waistCm: '91–97', hipIn: '42–44', hipCm: '107–112', inseamIn: '34', inseamCm: '86' },
{ size: 'XXL', waistIn: '38–40', waistCm: '97–102', hipIn: '44–46', hipCm: '112–117', inseamIn: '35', inseamCm: '89' },
{ size: 'XXXL', waistIn: '40–42', waistCm: '102–107', hipIn: '46–48', hipCm: '117–122', inseamIn: '36', inseamCm: '91'
},
];

return (
<div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Men's Clothing Size Chart</h2>

  {/* Tops Table */}
  <h3 className="text-xl font-semibold mt-6 mb-2">Tops (Shirts, Jackets)</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Size</th>
          <th className="border px-4 py-2">Chest (in)</th>
          <th className="border px-4 py-2">Chest (cm)</th>
          <th className="border px-4 py-2">Waist (in)</th>
          <th className="border px-4 py-2">Waist (cm)</th>
        </tr>
      </thead>
      <tbody>
        {topsSizes.map((row) => (
        <tr key={row.size} className="text-center">
          <td className="border px-4 py-2">{row.size}</td>
          <td className="border px-4 py-2">{row.chestIn}</td>
          <td className="border px-4 py-2">{row.chestCm}</td>
          <td className="border px-4 py-2">{row.waistIn}</td>
          <td className="border px-4 py-2">{row.waistCm}</td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Bottoms Table */}
  <h3 className="text-xl font-semibold mt-6 mb-2">Bottoms (Pants, Jeans)</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Size</th>
          <th className="border px-4 py-2">Waist (in)</th>
          <th className="border px-4 py-2">Waist (cm)</th>
          <th className="border px-4 py-2">Hip (in)</th>
          <th className="border px-4 py-2">Hip (cm)</th>
          <th className="border px-4 py-2">Inseam (in)</th>
          <th className="border px-4 py-2">Inseam (cm)</th>
        </tr>
      </thead>
      <tbody>
        {bottomsSizes.map((row) => (
        <tr key={row.size} className="text-center">
          <td className="border px-4 py-2">{row.size}</td>
          <td className="border px-4 py-2">{row.waistIn}</td>
          <td className="border px-4 py-2">{row.waistCm}</td>
          <td className="border px-4 py-2">{row.hipIn}</td>
          <td className="border px-4 py-2">{row.hipCm}</td>
          <td className="border px-4 py-2">{row.inseamIn}</td>
          <td className="border px-4 py-2">{row.inseamCm}</td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
}