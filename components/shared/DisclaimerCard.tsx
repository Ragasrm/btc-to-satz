// components/shared/DisclaimerCard.tsx
type DisclaimerCardProps = {
  readonly title: string;
  readonly icon: string;
  readonly bgColor: string;
  readonly textColor: string;
  readonly borderColor: string;
  readonly children: React.ReactNode;
};

export default function DisclaimerCard({
  title,
  icon,
  bgColor,
  textColor,
  borderColor,
  children,
}: DisclaimerCardProps) {
  return (
    <div className={`${bgColor} p-3 sm:p-4 rounded-lg border ${borderColor}`}>
      <h4 className={`${textColor} font-semibold mb-2 flex items-center text-sm sm:text-base`}>
        <span className="mr-2">{icon}</span>
        {title}
      </h4>
      {children}
    </div>
  );
}
