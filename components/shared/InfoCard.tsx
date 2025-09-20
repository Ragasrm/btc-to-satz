// components/shared/InfoCard.tsx
type InfoCardProps = {
  readonly title: string;
  readonly value: string;
  readonly description: string;
  readonly icon: string;
  readonly bgColor: string;
  readonly textColor: string;
  readonly borderColor: string;
  readonly valueColor?: string;
};

export default function InfoCard({
  title,
  value,
  description,
  icon,
  bgColor,
  textColor,
  borderColor,
  valueColor = textColor,
}: InfoCardProps) {
  return (
    <div className={`${bgColor} p-3 sm:p-4 lg:p-6 rounded-lg border ${borderColor}`}>
      <div className="text-center">
        <h4 className={`text-sm sm:text-base lg:text-lg ${textColor} font-semibold mb-2 lg:mb-3 flex items-center justify-center`}>
          <span className="mr-2">{icon}</span>
          {title}
        </h4>
        <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 break-all ${valueColor}`}>
          {value}
        </div>
        <p className={`text-xs sm:text-sm ${textColor}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
