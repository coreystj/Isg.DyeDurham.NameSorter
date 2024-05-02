

using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using System;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Models
{
    public class NameSorterResult
    {
        public Name[] Names { get; private set; }

        public NameSorterResult(string[] names)
        {
            Names = names.Select(x => NameUtils.Get(x)).ToArray();
        }

        public NameSorterResult(Name[] names) 
        {
            Names = names;
        }

        public string GenerateRaw()
        {
            return string.Join(Constants.RETURN_STANDARD, Names);
        }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            NameSorterResult other = (NameSorterResult)obj;

            // Compare lengths first
            if (Names.Length != other.Names.Length)
            {
                return false;
            }

            // Compare each element in the array
            for (int i = 0; i < Names.Length; i++)
            {
                if (!Names[i].Equals(other.Names[i]))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
