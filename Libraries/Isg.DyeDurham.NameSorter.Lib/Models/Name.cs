using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Models
{
    public struct Name
    {
        public string[] NameArguments { get; private set; }

        public Name(params string[] names) 
        {
            NameArguments = names;
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Name))
            {
                return false;
            }

            Name other = (Name)obj;

            // Compare lengths first
            if (NameArguments.Length != other.NameArguments.Length)
            {
                return false;
            }

            // Compare each element in the array
            for (int i = 0; i < NameArguments.Length; i++)
            {
                if (NameArguments[i] != other.NameArguments[i])
                {
                    return false;
                }
            }

            return true;
        }

        public override string ToString()
        {
            return string.Join(' ', NameArguments);
        }
    }
}
