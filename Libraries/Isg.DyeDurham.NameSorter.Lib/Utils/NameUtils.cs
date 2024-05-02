
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Models;
using System;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Utils
{
    public static class NameUtils
    {
        public static Name Get(string name)
        {
            try
            {
                return new Name(name.Split(' ')
                    .Where(x => !string.IsNullOrEmpty(x)).ToArray());
            }
            catch (Exception ex)
            {

                throw new NameProcessException($"Failed to process name '{name}'.", ex);
            }
        }
    }
}
