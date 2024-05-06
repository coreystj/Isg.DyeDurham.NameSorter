/*
 * Summary: This comparer class is used to compare names for ordering.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Lib.Models;
using System.Collections.Generic;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Comparers
{
    /// <summary>
    /// This comparer class is used to compare names for ordering.
    /// </summary>
    public class NameComparer : IComparer<Name>
    {
        /// <summary>
        /// Compares two names in reeverse from last name to first name.
        /// </summary>
        /// <param name="name1">The first name to be compared with.</param>
        /// <param name="name2">The second name to be compared with.</param>
        /// <returns>Returns a value for determining order between the provided names.</returns>
        public int Compare(Name name1, Name name2)
        {
            return string.Compare(
                    name1.NameArguments.Last(), 
                    name2.NameArguments.Last()
                );
        }
    }
}
