export const getInitials = (name: string) => name.charAt(0).toUpperCase();

export const getAvatarColor = (index: number) => {
  const colors = [
    'bg-blue-500 dark:bg-blue-600 text-white',
    'bg-emerald-500 dark:bg-emerald-600 text-white',
    'bg-indigo-500 dark:bg-indigo-600 text-white',
    'bg-amber-500 dark:bg-amber-600 text-white',
    'bg-rose-500 dark:bg-rose-600 text-white',
    'bg-cyan-500 dark:bg-cyan-600 text-white'
  ];
  return colors[index % colors.length];
};
